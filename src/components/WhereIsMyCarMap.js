import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { useRef, useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking, TouchableOpacity, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './MapStyles';
import { useNavigation } from '@react-navigation/native';
import { useCarLocation } from '../context/CarLocationContext/CarLocationContext';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';

const MAPBOX_ACCESS_TOKEN = Constants.expoConfig.extra.mapbox;
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const iconImages = {
    'selected-icon': require('./Icons/markerSelected.png'),
    'car-icon': require('./Icons/car.png'),
};

const ExpoactivaMarker = ({ goToExpoactiva }) => {
    const { theme } = useContext(ThemeContext);
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
                coordinates: [-57.8942, -33.45128],
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
                    textColor: theme.currentTheme === 'light' ? 'black' : 'white',
                }}
            />
        </Mapbox.ShapeSource>
    );
};

const CarMarker = ({ deviceCoordinates, onCarPress }) => {
    return (
        <Mapbox.MarkerView coordinate={[deviceCoordinates[0], deviceCoordinates[1]]} id="car-marker">
            <Image style={{ width: 55, height: 55 }} source={require('./Icons/car.png')} />
        </Mapbox.MarkerView>
    );
};

export const WhereIsMyCarMap = () => {
    const cameraRef = useRef(null);
    const [deviceCoordinates, setDeviceCoordinates] = useState(null);
    const [distanceToCarMarker, setDistanceToCarMarker] = useState(null);
    const navigation = useNavigation();
    const initialDeviceCoordinatesRef = useRef(null);
    const initialCameraSetRef = useRef(false);
    const { carLocation, saveCarLocation, removeCarLocation } = useCarLocation();
    const { theme } = useContext(ThemeContext);
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const radioTierra = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = radioTierra * c;
        return distancia;
    };

    useEffect(() => {
        (async () => {
            let locationSubscription;

            try {
                const { status } = await Location.getForegroundPermissionsAsync();

                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    Alert.alert(
                        translation.whereismycar.mapNotAvailable,
                        translation.whereismycar.mapAccessPermission,
                        [
                            {
                                text: translation.whereismycar.goToSettings,
                                onPress: () => Linking.openSettings(),
                                style: "cancel"
                            },
                            {
                                text: translation.whereismycar.cancel,
                                onPress: () => console.log("Cancel Pressed"),
                                style: "destructive"
                            }
                        ]
                    );
                    navigation.goBack();
                }

                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 2,
                    },
                    (location) => {
                        if (!initialDeviceCoordinatesRef.current) {
                            initialDeviceCoordinatesRef.current = [
                                location.coords.longitude,
                                location.coords.latitude,
                            ];
                        }

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

    useEffect(() => {
        if (!initialCameraSetRef.current && cameraRef.current && (carLocation || initialDeviceCoordinatesRef.current)) {
            let centerCoordinates = carLocation
                ? [carLocation.longitude, carLocation.latitude]
                : initialDeviceCoordinatesRef.current;

            cameraRef.current.setCamera({
                centerCoordinate: centerCoordinates,
                zoomLevel: 16,
                animationDuration: 500,
            });

            initialCameraSetRef.current = true;
        }
    }, [carLocation, cameraRef.current]);

    useEffect(() => {
        calcularDistanciaHastaCarMarker();
    }, [deviceCoordinates, carLocation]);

    const calcularDistanciaHastaCarMarker = () => {
        if (deviceCoordinates && carLocation) {
            const distancia = calcularDistancia(
                deviceCoordinates[1],
                deviceCoordinates[0],
                carLocation.latitude,
                carLocation.longitude
            );
            setDistanceToCarMarker(distancia * 1000); // Convertir de kilómetros a metros
        }
    };

    const goToCarLocation = () => {
        if (carLocation) {
            cameraRef.current.setCamera({
                centerCoordinate: [carLocation.longitude, carLocation.latitude],
                zoomLevel: 18,
                animationDuration: 500,
            });
        }
    };

    const goToExpoactiva = () => {
        cameraRef.current.setCamera({
            centerCoordinate: [-57.8942, -33.45128],
            zoomLevel: 15.5,
            animationDuration: 500,
        });
    };

    const centerCamera = () => {
        if (!deviceCoordinates) return;
        cameraRef.current.setCamera({
            centerCoordinate: deviceCoordinates,
            zoomLevel: 16,
            duration: 500,
            pitch: 0,
        });
    };

    const toggleCarMarker = async () => {
        if (carLocation) {
            Alert.alert(
                translation.whereismycar.removeMarker,
                translation.whereismycar.removeMarkerConfirmation,
                [
                    {
                        text: translation.whereismycar.cancel,
                        onPress: () => console.log("Cancelado"),
                        style: "cancel"
                    },
                    {
                        text: translation.whereismycar.delete,
                        onPress: async () => {
                            removeCarLocation();
                        },
                        style: "destructive"
                    }
                ]
            );
        } else {
            const coordinatesToSave = {
                longitude: deviceCoordinates[0],
                latitude: deviceCoordinates[1]
            };
            saveCarLocation(coordinatesToSave);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Mapbox.MapView
                zoomLevel={15}
                centerCoordinate={[0, 0]}
                style={{ flex: 1 }}
                pitchEnabled={false}
                attributionEnabled={false}
                logoEnabled={false}
                styleURL={theme.currentTheme === 'light' ? 'mapbox://styles/lazaroborghi/cln8wy7yk07c001qb4r5h2yrg' : 'mapbox://styles/lazaroborghi/clp7m30oh014j01nsaju4fd7f'}
                scaleBarEnabled={false}
            >
                <Mapbox.UserLocation minDisplacement={0.2} visible={true} renderMode={'normal'} showsUserHeadingIndicator={true} />
                <Mapbox.Camera
                    ref={cameraRef}
                    centerCoordinate={carLocation ? [carLocation.longitude, carLocation.latitude] : initialDeviceCoordinatesRef.current}
                    zoomLevel={15.6}
                    animationDuration={500}
                    maxZoomLevel={20}
                />
                <Mapbox.Images images={iconImages} />
                {carLocation && <CarMarker deviceCoordinates={[carLocation.longitude, carLocation.latitude]} onCarPress={goToCarLocation} />}
                <ExpoactivaMarker goToExpoactiva={goToExpoactiva} />
            </Mapbox.MapView>

            {/* Botones y elementos adicionales */}
            <TouchableOpacity
                onPress={goToCarLocation}
                disabled={!carLocation}
                style={[
                    styles.searchButton,
                    {
                        bottom: 20,
                        left: '58.5%',
                        transform: [{ translateX: 15 }],
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
                <MaterialCommunityIcons name="car" size={24} color={carLocation ? theme.customColors.activeColor : theme.customColors.disabled} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={centerCamera}
                style={[
                    styles.searchButton,
                    {
                        bottom: 20,
                        left: '77%',
                        transform: [{ translateX: 15 }],
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
            <TouchableOpacity
                onPress={toggleCarMarker}
                style={[
                    styles.searchButton,
                    {
                        bottom: 20,
                        left: '25%',
                        transform: [{ translateX: -75 }],
                        padding: 15,
                        width: 200,
                        opacity: 0.85,
                        backgroundColor: theme.currentTheme === 'dark' ? '#1E1E1E' : '#fff',
                    }
                ]}
            >
                <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        name={carLocation ? "car-off" : "car"}
                        size={24}
                        color={carLocation ? "#F54141" : theme.customColors.activeColor}
                    />
                    {carLocation ? <Text style={{ fontSize: 17, fontWeight: '500', color: '#F54141' }}>{translation.whereismycar.deleteMarker}</Text> : <Text style={{ fontSize: 17, fontWeight: '500', color: theme.customColors.activeColor }}>{translation.whereismycar.markMyCar}</Text>}
                </View>
            </TouchableOpacity>

            {distanceToCarMarker !== null && carLocation && (
                <View style={[styles.searchButton, { top: 20, left: 20, backgroundColor: theme.currentTheme === 'dark' ? '#1E1E1E' : '#fff', padding: 8, borderRadius: 50, shadowColor: 'darkgray' }]}>
                    {distanceToCarMarker.toFixed(1) < 5.0
                        ? <Text style={{ fontSize: 14, fontWeight: '400', color: theme.customColors.activeColor }}>{translation.whereismycar.veryCloseToYourCar}</Text>
                        : <Text style={{ fontSize: 14, fontWeight: '400', color: theme.customColors.activeColor }}>{distanceToCarMarker.toFixed(1)} {translation.whereismycar.metersToYourCar}</Text>
                    }
                </View>
            )}
        </View>
    );
};
