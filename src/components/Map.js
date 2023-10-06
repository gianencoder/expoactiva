import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Platform, Dimensions } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import useNavigationApi from '../hooks/useNavigationApi.js';
import MapNavigation from './MapNavigation.js';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet from './BottomSheet.js';
import { exhibitors } from '../assets/expositores.js';
import * as Location from 'expo-location';
import styles from './MapStyles';

const MAPBOX_ACCESS_TOKEN = 'sk.eyJ1IjoibGF6YXJvYm9yZ2hpIiwiYSI6ImNsbTczaW5jdzNncGgzam85bjdjcDc3ZnQifQ.hhdcu0s0SZ2gm_ZHQZ4h7A';
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const formatDistance = (distance) => {
    const roundedDistance = Math.round(distance);
    return `${roundedDistance}`;
};

const iconImages = {
    'selected-icon': require('./Icons/markerSelected.png'),
    'unselected-icon': require('./Icons/marker.png')
  };
 
  const ExhibitorMarker = React.memo(({ exhibitor, selectedExhibitor, selectExhibitor, navigationMode, zoomLevel }) => {
    const isSelected = selectedExhibitor && selectedExhibitor.id === exhibitor.id;
    
    // Si navigationMode es true y el marcador no está seleccionado, no renderizamos nada.
    if (navigationMode === true && !isSelected) {
        return null;
    }
    
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
  
    const shouldAllowOverlap = zoomLevel > 16

    return (
        <Mapbox.ShapeSource
            id={`source_${exhibitor.id}`}
            shape={featureCollection}
            onPress={() => selectExhibitor(exhibitor)}
        >
            <Mapbox.SymbolLayer
                id={`layer_${exhibitor.id}`}
                style={{
                    iconImage: ['get', 'icon'],
                    iconAllowOverlap: isSelected || shouldAllowOverlap ? true : false,
                    iconSize: isSelected ? 0.6 : 0.5,
                    iconOpacity: selectedExhibitor ? (isSelected ? 1 : 0.5) : 1,
                    textField: ['get', 'title'],
                    textAllowOverlap: isSelected || shouldAllowOverlap ? true : false,
                    textAnchor: 'top',
                    textOffset: [0, 1.5],
                    textSize: isSelected ? 17 : 16,
                    textOpacity: selectedExhibitor ? (isSelected ? 1 : 0.5) : 1,
                }}
            />
        </Mapbox.ShapeSource>
    );
});

const Map = () => {

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

    useEffect(() => {
        (async () => {
            let locationSubscription;
            
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }
                
                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 2500,
                        distanceInterval: 5,
                    },
                    (location) => {
                        setDeviceCoordinates([
                            location.coords.longitude,
                            location.coords.latitude,
                        ]);
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

    const getZoomLevel = async () => {
        try {
            const zoom = await mapRef.current.getZoom(); 
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
                pitch: 0,  
                animationDuration: 300  
            });
        } 
        
        if (followUserMode) {
            startNavigation();
        }
    }, [followUserMode]);  
    
    useEffect(() => {
        if (followUserMode && cameraRef.current) {
            cameraRef.current.setCamera({
                centerCoordinate: deviceCoordinates,
                zoomLevel: 19,
                duration: 2000,
                pitch: 45,
            });
        }
    }, [followUserMode, deviceCoordinates]);
    

    const navigationConfig = useMemo(() => ({
        origin: deviceCoordinates ? {latitude: deviceCoordinates[1], longitude: deviceCoordinates[0]} : null,
        destination: selectedExhibitor ? {latitude: selectedExhibitor.latitude, longitude: selectedExhibitor.longitude} : null,
        token: MAPBOX_ACCESS_TOKEN,
        deviceCoordinates: deviceCoordinates,
        navigationMode: navigationMode
    }), [deviceCoordinates, selectedExhibitor, navigationMode]);
    
    const { route, distance, duration, loading, error, origin, destination } = useNavigationApi(navigationConfig);
    
    const adjustCamera = () => {
        // Si `deviceCoordinates` o `selectedExhibitor` son null, no ajusta la cámara
        if (!deviceCoordinates || !selectedExhibitor) return;
    
        if (!cameraAdjusted) {
            
            // Calcula el punto medio entre el usuario y el destino en el eje X y Y
            const midLatitude = (deviceCoordinates[1] + selectedExhibitor.latitude) / 2;
            const midLongitude = (deviceCoordinates[0] + selectedExhibitor.longitude) / 2;
    
            let zoomLevel = 17;
    
            // Ajusta la cámara a la nueva posición
            cameraRef.current.setCamera({
                centerCoordinate: [midLongitude, midLatitude],
                zoomLevel: zoomLevel,
                animationDuration: 500,
            });
    
            // Marcar que la cámara gue ajustada
            setCameraAdjusted(true);
        } else {
            // Si la cámara ya fue ajustada, vuelva a la posición original
            cameraRef.current.setCamera({
                centerCoordinate: deviceCoordinates,
                zoomLevel: 19,
                duration: 500,
                pitch: 45,
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
        const toValueHeight = isSearchMode ? 0 : 60;  // Valor a animar basado en isSearchMode
    
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
        
        if(isSearchMode){
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
            }, 80); 
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
        setNavigationMode(prevMode => !prevMode);
    }, []);

    const toggleFollowUserMode = useCallback(() => {
        setFollowUserMode(prevMode => !prevMode);
    } ,[]);

    const initiateSearch = () => {
        console.log(selectedExhibitor)
        // Si la BottomSheet ya está visible, la cerramos
        if (selectedExhibitor) {
            setSelectedExhibitor(null);
            closeBottomSheet();
            setIsSearchMode(true);
            
        } else {
            // Si la BottomSheet no está visible, simplemente realizamos la operación de búsqueda
            setIsSearchMode(true);
            openBottomSheet();
        }
    };
    
    return (
        <View style={{ flex: 1 }}>
            <Animated.View style={{ flex: heightAnim.interpolate({
                inputRange: selectedExhibitor ? [60,110] : [100, 200],
                outputRange: followUserMode ? [1, 0.95] : [1, 0.45]
            }) }}>
                <Mapbox.MapView ref={mapRef} style={{ flex: 1 }} onPress={onMapPress} styleURL='mapbox://styles/lazaroborghi/cln8wy7yk07c001qb4r5h2yrg' onCameraChanged={handleRegionChange} scaleBarEnabled={false}>
                    
                    <Mapbox.UserLocation visible={true} androidRenderMode={followUserMode ? 'gps' : 'normal'} showsUserHeadingIndicator={true} />
                    <Mapbox.Camera
                        ref={cameraRef}
                        centerCoordinate={followUserMode && deviceCoordinates ? [deviceCoordinates[0], deviceCoordinates[1]] : [exhibitors[0].longitude, exhibitors[0].latitude]}
                        zoomLevel={16}
                        animationDuration={2000}
                    />
                    <Mapbox.Images images={iconImages}/>

                    {exhibitors.map((exhibitor) => (
                        <ExhibitorMarker 
                            key={exhibitor.id}
                            exhibitor={exhibitor}
                            selectedExhibitor={selectedExhibitor}
                            selectExhibitor={selectExhibitor}
                            distance={distance}
                            navigationMode={navigationMode}
                            zoomLevel={zoomLevel}
                        />
                    ))}
                    
                    

                    {navigationMode && (
                        <MapNavigation route={route} cameraRef={cameraRef} origin={origin} destination={destination} />
                    )}
                </Mapbox.MapView>
                {!followUserMode && (
                    <TouchableOpacity 
                        onPress={initiateSearch} 
                        style={[
                            styles.searchButton,
                            {
                                bottom: selectedExhibitor ? 55 : 50,
                                left: '50%',
                                transform: [{translateX: selectedExhibitor ? -50 : -100}],
                                padding: selectedExhibitor ? 5 : 15,
                                width: selectedExhibitor ? 100 : 200,
                                opacity: selectedExhibitor ? 0.60 : 0.85,
                            }
                        ]}
                    >
                        <AntDesign name="search1" size={15} style={styles.searchIcon} />
                        <Text style={[styles.searchText, {fontSize: selectedExhibitor ? 14 : 16}]}>
                            {selectedExhibitor ? 'Buscar' : 'Buscar expositores'}
                        </Text>
                    </TouchableOpacity>
                )}


            </Animated.View>
            <BottomSheet
                slideAnim={slideAnim}
                heightAnim={heightAnim}
                selectedExhibitor={selectedExhibitor}
                distance={distance}
                formatDistance={formatDistance}
                onMapPress={onMapPress}
                navigationMode={navigationMode}
                toggleNavigationMode={toggleNavigationMode}
                isSearchMode={isSearchMode}
                selectExhibitor={selectExhibitor}
                followUserMode={followUserMode}
                toggleFollowUserMode={toggleFollowUserMode}
                adjustCamera={adjustCamera}
            />
        </View>
    );
};

export default Map;
