import React, { useState, useRef, useCallback, useMemo, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Platform, Dimensions, Alert, Linking, AppState } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import useNavigationApi from '../hooks/useNavigationApi.js';
import MapNavigation from './MapNavigation.js';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from './BottomSheetNavigator.js';
import * as Location from 'expo-location';
import styles from './MapStyles';
import * as turf from '@turf/turf';
import { NavigationHook } from '../hooks/NavigationHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { capitalize } from '../util/utils.tsx';
import { ThemeContext } from '../context/themeContext/ThemeContext.tsx';


const MAPBOX_ACCESS_TOKEN = Constants.expoConfig.extra.mapbox;
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const EXPOACTIVA_MARKER_LONGITUD = -57.8942;
const EXPOACTIVA_MARKER_LATITUD = -33.45128;

const iconImages = {
    'selected-icon': require('./Icons/markerSelected.png'),
    'unselected-icon': require('./Icons/marker.png')
};

const ExhibitorMarker = React.memo(({ exhibitor, selectedExhibitor, selectExhibitor, navigationMode, zoomLevel }) => {
    const isSelected = selectedExhibitor && selectedExhibitor.id === exhibitor.id;
    const { theme } = React.useContext(ThemeContext);

    // Si navigationMode es true y el marcador no está seleccionado, no renderizamos nada.
    if (navigationMode === true && !isSelected) {
        return null;
    }

    exhibitor.name = capitalize(exhibitor.name);

    const featureCollection = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            id: exhibitor.id,
            properties: {
                icon: isSelected ? 'selected-icon' : 'unselected-icon',
                title: exhibitor.name,
            },
            geometry: {
                type: 'Point',
                coordinates: [exhibitor.longitude, exhibitor.latitude],
            },
        }]
    };

    const shouldAllowOverlap = zoomLevel > 15.5;

    return (
        <Mapbox.ShapeSource
            id={`source_${exhibitor.id}`}
            shape={featureCollection}
            onPress={() => selectExhibitor(exhibitor)}
            hitbox={{ width: 20, height: 20 }}
        >
            <Mapbox.SymbolLayer
                id={`layer_${exhibitor.id}`}
                style={{
                    iconImage: ['get', 'icon'],
                    iconAllowOverlap: isSelected || shouldAllowOverlap ? true : false,
                    iconSize: isSelected ? 0.35 : 0.30,
                    iconOpacity: selectedExhibitor ? (isSelected ? 1 : 0.5) : 1,
                    textField: ['get', 'title'],
                    textAllowOverlap: isSelected || shouldAllowOverlap ? true : false,
                    textAnchor: 'top',
                    textOffset: [0, 1.7],
                    textSize: isSelected ? 14 : 13,
                    textOpacity: selectedExhibitor ? (isSelected ? 1 : 0.5) : 1,
                    textColor: theme.colors.text,
                }}
            />
        </Mapbox.ShapeSource>
    );
});

const ExpoactivaMarker = React.memo(({ goToExpoactiva }) => {
    const { theme } = React.useContext(ThemeContext);
    const featureCollection = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            id: 'expoactiva',
            properties: {
                icon: 'selected-icon',
                title: 'Expoactiva Nacional',
            },
            geometry: {
                type: 'Point',
                coordinates: [EXPOACTIVA_MARKER_LONGITUD, EXPOACTIVA_MARKER_LATITUD],
            },
        }]
    };

    return (
        <Mapbox.ShapeSource
            id={`source_expoactiva`}
            shape={featureCollection}
            onPress={() => goToExpoactiva()}
            hitbox={{ width: 20, height: 20 }}
        >
            <Mapbox.SymbolLayer
                id={`layer_expoactiva`}
                style={{
                    iconImage: ['get', 'icon'],
                    iconSize: 0.35,
                    textField: ['get', 'title'],
                    textAnchor: 'top',
                    textOffset: [0, 1.7],
                    textSize: 14,
                    textColor: theme.colors.text,
                }}
            />
        </Mapbox.ShapeSource>
    );
});

const Map = ({ showModal }) => {

    const mapRef = useRef();
    const [navigationMode, setNavigationMode] = useState(false);

    const slideAnim = useRef(new Animated.Value(-500)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;

    const [selectedExhibitor, setSelectedExhibitor] = useState(null);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const cameraRef = useRef(null);
    const [firstOpen, setFirstOpen] = useState(true);
    const [cameraAdjusted, setCameraAdjusted] = useState(false);
    const [deviceCoordinates, setDeviceCoordinates] = useState(null);
    const [followUserMode, setFollowUserMode] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(16);
    const [disableNavigation, setDisableNavigation] = useState(false);
    const { navigation } = NavigationHook()
    const [exhibitors, setExhibitors] = useState([]);
    const { theme } = React.useContext(ThemeContext);

    const getExhibitors = async () => {
        try {
            const exhibitorsString = await AsyncStorage.getItem('@exhibitors');
            if (exhibitorsString !== null) {
                const parsedExhibitors = JSON.parse(exhibitorsString);
                const usableExhibitors = parsedExhibitors.map((exhibitor) => {
                    return {
                        ...exhibitor,
                        latitude: parseFloat(exhibitor.latitude),
                        longitude: parseFloat(exhibitor.longitude),
                    };
                });
                setExhibitors(usableExhibitors);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getExhibitors();
    }, []);

    useEffect(() => {
        (async () => {
            let locationSubscription;

            try {
                const { status } = await Location.getForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    Alert.alert(
                        "Mapa no disponible",
                        "Para ver el mapa, tiene que permitir el acceso a su ubicación.",
                        [
                            {
                                text: "Ir a Configuración",
                                onPress: () => Linking.openSettings(),
                                style: "cancel"
                            },
                            {
                                text: "Cancelar",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "destructive"
                            }
                        ]
                    );
                    showModal();
                    return;
                }

                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 2000,
                        distanceInterval: 1,
                    },
                    (location) => {

                        setDeviceCoordinates([
                            location.coords.longitude,
                            location.coords.latitude,
                        ]);

                        const currentCoordinates = [
                            location.coords.latitude,
                            location.coords.longitude,
                        ];

                        const expoactivaCoordinates = [
                            [-33.44597, -57.89884],
                            [-33.44745, -57.88872],
                            [-33.45350, -57.88924],
                            [-33.45335, -57.89820],
                            [-33.44597, -57.89884],
                        ];


                        if (!isUserInExpoactiva(currentCoordinates, expoactivaCoordinates)) {
                            setDisableNavigation(true);
                        } else {
                            setDisableNavigation(false);
                        }
                    }
                );
            } catch (error) {
                console.error("An error occurred:", error);
            }

            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        })();
    }, []);


    const checkLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status;
    };

    useEffect(() => {
        if (Platform.OS !== 'android') {
            const handleAppStateChange = async () => {
                const status = await checkLocationPermission();
                if (status !== 'granted') {
                    showModal();
                }
            };

            const subscription = AppState.addEventListener("change", handleAppStateChange);

            return () => {
                subscription.remove();
            };
        }
    }, []);


    const goToExpoactiva = () => {
        cameraRef.current.setCamera({
            centerCoordinate: [EXPOACTIVA_MARKER_LONGITUD, EXPOACTIVA_MARKER_LATITUD],
            zoomLevel: 15.5,
            animationDuration: 500,
        });
    };

    const isUserInExpoactiva = (deviceCoordinates, expoactivaCoordinates) => {
        const point = turf.point(deviceCoordinates);
        const polygon = turf.polygon([expoactivaCoordinates]);

        return turf.booleanPointInPolygon(point, polygon);
    };

    const getZoomLevel = async () => {
        try {
            const zoom = await mapRef.current.getZoom();
            setZoomLevel(zoom);
        } catch (error) {
            console.log("Error getting zoom level: ", error);
        }
    };

    const handleRegionChange = async () => {
        getZoomLevel();
    };

    useEffect(() => {
        if (selectedExhibitor === null && isSearchMode) {
            openBottomSheet();
        }
    }, [selectedExhibitor, isSearchMode, openBottomSheet]);

    useEffect(() => {
        if (!followUserMode && cameraRef.current) {
            cameraRef.current.setCamera({
                zoomLevel: 17,
                pitch: 0,
                animationDuration: 500
            });
        }

        if (followUserMode) {
            startNavigation();
        }
    }, [followUserMode]);

    useEffect(() => {
        if (followUserMode && cameraRef.current && !cameraAdjusted) {
            cameraRef.current.setCamera({
                centerCoordinate: deviceCoordinates,
                zoomLevel: 17.5,
                duration: 1000,
                pitch: 0,
            });
        }
    }, [followUserMode, deviceCoordinates]);

    useEffect(() => {
        let timerId;

        if (navigationMode) {
            timerId = setTimeout(() => {
                setNavigationMode(false);
                Alert.alert("Navegación cancelada", "La navegación se ha cancelado automáticamente después de 1 hora.");
            }, 60 * 60 * 1000);  // 60 minutos
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
        };
    }, [navigationMode]);

    const navigationConfig = useMemo(() => ({
        origin: deviceCoordinates ? { latitude: deviceCoordinates[1], longitude: deviceCoordinates[0] } : null,
        destination: selectedExhibitor ? { latitude: selectedExhibitor.latitude, longitude: selectedExhibitor.longitude } : null,
        token: MAPBOX_ACCESS_TOKEN,
        deviceCoordinates: deviceCoordinates,
        navigationMode: navigationMode,
        disableNavigation: disableNavigation,
    }), [deviceCoordinates, selectedExhibitor, navigationMode]);

    const { route, distance, loading, error, origin, destination } = useNavigationApi(navigationConfig);

    const centerCamera = () => {
        if (!deviceCoordinates) return;
        cameraRef.current.setCamera({
            centerCoordinate: deviceCoordinates,
            zoomLevel: 16,
            duration: 500,
            pitch: 0,
        });
    };

    const adjustCamera = () => {
        // Si deviceCoordinates o selectedExhibitor son null, no ajusta la cámara
        if (!deviceCoordinates || !selectedExhibitor) return;

        if (!cameraAdjusted) {

            // Calcula el punto medio entre el usuario y el destino en el eje X y Y
            const midLatitude = (deviceCoordinates[1] + selectedExhibitor.latitude) / 2;
            const midLongitude = (deviceCoordinates[0] + selectedExhibitor.longitude) / 2;

            let zoomLevel = 16;

            // Ajusta la cámara a la nueva posición
            cameraRef.current.setCamera({
                centerCoordinate: [midLongitude, midLatitude],
                zoomLevel: zoomLevel,
                animationDuration: 200,
            });

            // Marcar que la cámara gue ajustada
            setCameraAdjusted(true);
        } else {
            // Si la cámara ya fue ajustada, vuelva a la posición original
            cameraRef.current.setCamera({
                centerCoordinate: deviceCoordinates,
                zoomLevel: 16,
                duration: 200,
                pitch: 0,
            });

            // Marcar que la cámara fue desajustada
            setCameraAdjusted(false);
        }
    };

    const openBottomSheet = useCallback(() => {

        const animationDuration = (firstOpen && isSearchMode) ? 200 : 200;
        let targetValue = selectedExhibitor ? 40 : 100;

        if (Platform.OS === 'android') {
            slideAnim.setValue(0);
            heightAnim.setValue(targetValue);
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: animationDuration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnim, {
                    toValue: targetValue,
                    duration: animationDuration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: false,
                })
            ]).start(() => {
                firstOpen && setFirstOpen(false);
            });
        }
    }, [slideAnim, heightAnim, selectedExhibitor, firstOpen, isSearchMode]);

    const closeBottomSheet = useCallback(() => {

        const animationDuration = followUserMode ? 400 : 250

        const toValueSlide = isSearchMode ? -500 : -800;  // Valor a animar basado en isSearchMode
        const toValueHeight = isSearchMode ? 20 : 60;  // Valor a animar basado en isSearchMode

        if (Platform.OS === 'android') {
            slideAnim.setValue(toValueSlide);
            heightAnim.setValue(toValueHeight);
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: toValueSlide,
                    duration: animationDuration,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnim, {
                    toValue: toValueHeight,
                    duration: animationDuration,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: false,
                })
            ]).start();
        }

        if (navigationMode) {
            toggleNavigationMode();
        }
    }, [slideAnim, heightAnim, navigationMode, toggleNavigationMode, isSearchMode]);

    const startNavigation = useCallback(() => {

        const toValueSlide = -200;
        const toValueHeight = Dimensions.get('window').height * 0.155;
        if (Platform.OS === 'android') {
            slideAnim.setValue(toValueSlide);
            heightAnim.setValue(toValueHeight);
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: toValueSlide,
                    duration: 300,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: false,
                }),
                Animated.timing(heightAnim, {
                    toValue: toValueHeight,
                    duration: 200,
                    easing: Easing.in(Easing.cubic),
                    useNativeDriver: false,
                })
            ]).start();
        }
    }, [slideAnim, heightAnim]);

    const selectExhibitor = useCallback((exhibitor) => {

        if (isSearchMode) {
            closeBottomSheet();
            setSelectedExhibitor(exhibitor);

            cameraRef.current.setCamera({
                centerCoordinate: [exhibitor.longitude, exhibitor.latitude],
                zoomLevel: 18,
                animationDuration: 300,
            });

            setTimeout(() => {
                setIsSearchMode(false);
                openBottomSheet();
            }, 100);
        } else {
            selectedExhibitor ?? openBottomSheet();

            setSelectedExhibitor(exhibitor);
            cameraRef.current.setCamera({
                centerCoordinate: [exhibitor.longitude, exhibitor.latitude],
                zoomLevel: 18,
                animationDuration: 300,
            });

        }
    }, [isSearchMode, openBottomSheet, closeBottomSheet]);

    const onMapPress = useCallback(() => {
        closeBottomSheet();
        setSelectedExhibitor(null);
        setNavigationMode(false);
        setFollowUserMode(false);
        setIsSearchMode(false);
    }, []);

    const toggleNavigationMode = useCallback(() => {
        console.log(disableNavigation);
        if (disableNavigation) {
            Alert.alert(
                "Navegación no disponible",
                "Para recibir indicaciones, tiene que estar cerca del predio de Expoactiva.",
                [
                    {
                        text: "¿Cómo llegar?",
                        onPress: () => {
                            showModal();
                            navigation.navigate('GoToPlaceScreen');

                        },
                        style: "cancel"
                    },

                    {
                        text: "Cancelar",
                        onPress: () => console.log("OK Pressed"),
                        style: "cancel"
                    },


                ]
            );
            setNavigationMode(false);
            return;
        }
        setNavigationMode(prevMode => !prevMode);
    }, [disableNavigation]);


    const toggleFollowUserMode = useCallback(() => {
        setFollowUserMode(prevMode => !prevMode);
    }, []);

    const initiateSearch = () => {
        // Si la BottomSheet ya está visible, la cierro
        if (selectedExhibitor) {
            setSelectedExhibitor(null);
            closeBottomSheet();
            setIsSearchMode(true);

        } else {
            // Si la BottomSheet no está visible, se abre en modo busqueda
            setIsSearchMode(true);
            openBottomSheet();
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={{
                flex: heightAnim.interpolate({
                    inputRange: selectedExhibitor ? [60, 110] : [100, 200],
                    outputRange: followUserMode || isSearchMode ? [1, 1] : [1, 0.43]
                })
            }}>
                <Mapbox.MapView pitchEnabled={false} attributionEnabled={false} logoEnabled={false} ref={mapRef} style={{ flex: 1 }} onPress={!followUserMode && onMapPress} styleURL={theme.currentTheme ==='light' ? 'mapbox://styles/lazaroborghi/cln8wy7yk07c001qb4r5h2yrg' : 'mapbox://styles/lazaroborghi/clp7m30oh014j01nsaju4fd7f'} onCameraChanged={handleRegionChange} scaleBarEnabled={false}>
                    <Mapbox.UserLocation minDisplacement={0.2} visible={true} androidRenderMode={followUserMode ? 'gps' : 'normal'} renderMode={Platform.OS === 'android' && followUserMode ? 'native' : 'normal'} showsUserHeadingIndicator={true} />
                    <Mapbox.Camera
                        ref={cameraRef}
                        centerCoordinate={followUserMode && deviceCoordinates ? [deviceCoordinates[0], deviceCoordinates[1]] : [EXPOACTIVA_MARKER_LONGITUD, EXPOACTIVA_MARKER_LATITUD]}
                        zoomLevel={15.6}
                        animationDuration={500}
                        maxZoomLevel={17}
                    />
                    <Mapbox.Images images={iconImages} />
                    {zoomLevel <= 15 ? (
                        <ExpoactivaMarker goToExpoactiva={goToExpoactiva} />
                    ) : (
                        exhibitors && exhibitors.map((exhibitor) => (
                            <ExhibitorMarker
                                key={exhibitor.id}
                                exhibitor={exhibitor}
                                selectedExhibitor={selectedExhibitor}
                                selectExhibitor={selectExhibitor}
                                navigationMode={navigationMode}
                                zoomLevel={zoomLevel}
                            />
                        ))
                    )}
                    {navigationMode && !disableNavigation && distance > 5 && (
                        <MapNavigation route={route} cameraRef={cameraRef} origin={origin} destination={destination} loading={loading} />
                    )}
                </Mapbox.MapView>
                {!followUserMode && (
                    <>
                        <TouchableOpacity
                            onPress={initiateSearch}
                            style={[
                                styles.searchButton,
                                {
                                    bottom: selectedExhibitor ? 75 : 70,
                                    left: '50%',
                                    transform: [{ translateX: selectedExhibitor ? -50 : -75 }],
                                    padding: selectedExhibitor ? 5 : 15,
                                    width: selectedExhibitor ? 100 : 150,
                                    opacity: selectedExhibitor ? 0.60 : 0.85,
                                    backgroundColor: theme.currentTheme === 'dark' ? '#1E1E1E' : '#fff',
                                }
                            ]}
                        >
                            <AntDesign name="search1" size={15} style={[styles.searchIcon, {color: theme.customColors.activeColor}]} />
                            <Text style={[styles.searchText, { fontSize: selectedExhibitor ? 14 : 16, color: theme.customColors.activeColor } ]}>
                                Buscar
                            </Text>
                        </TouchableOpacity>
                        {!selectedExhibitor && (
                            <TouchableOpacity
                                onPress={centerCamera}
                                style={[
                                    styles.searchButton,
                                    {
                                        bottom: 70,
                                        left: '75%',
                                        transform: [{ translateX: 10 }],
                                        padding: 15,
                                        width: 'auto',
                                        borderRadius: 50,
                                        opacity: 0.85,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: theme.currentTheme === 'dark' ? '#1E1E1E' : '#fff',
                                    }
                                ]}
                            >
                                <MaterialCommunityIcons name="crosshairs-gps" color={theme.customColors.activeColor} size={24} />
                            </TouchableOpacity>
                        )}
                    </>
                )}

            </Animated.View>
            <BottomSheet
                slideAnim={slideAnim}
                heightAnim={heightAnim}
                selectedExhibitor={selectedExhibitor}
                distance={distance}
                onMapPress={onMapPress}
                navigationMode={navigationMode}
                toggleNavigationMode={toggleNavigationMode}
                isSearchMode={isSearchMode}
                selectExhibitor={selectExhibitor}
                followUserMode={followUserMode}
                toggleFollowUserMode={toggleFollowUserMode}
                adjustCamera={adjustCamera}
                loading={loading}
                cameraAdjusted={cameraAdjusted}
            />
        </View>
    );
};

export default Map;
