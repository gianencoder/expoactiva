import Mapbox from '@rnmapbox/maps';
import Constants from 'expo-constants';
import { useRef, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './MapStyles';
import { useNavigation } from '@react-navigation/native';
import { useCarLocation } from '../context/CarLocationContext/CarLocationContext';

const MAPBOX_ACCESS_TOKEN = Constants.expoConfig.extra.mapbox;
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const iconImages = {
    'selected-icon': require('./Icons/markerSelected.png'),
    'car-icon': require('./Icons/car.png'),
};

const EXPOACTIVA_MARKER_LONGITUD = -57.8942;
const EXPOACTIVA_MARKER_LATITUD = -33.45128;

const ExpoactivaMarker = ({ goToExpoactiva }) => {
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
                }}
            />
        </Mapbox.ShapeSource>
    );
};
    
const CarMarker = ({ deviceCoordinates, onCarPress }) => {

    return (

        <Mapbox.MarkerView coordinate={[deviceCoordinates[0],deviceCoordinates[1]]} id="car-marker" >
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 65}}>
                <MaterialCommunityIcons name="car" color="#004B11" size={32} />
                <Ionicons name="pin" color="#F05950" size={40} />
            </View>

        </Mapbox.MarkerView>
            
    );
};

export const WhereIsMyCarMap = () => {

    const cameraRef = useRef(null);
    const [deviceCoordinates, setDeviceCoordinates] = useState(null);
    const navigation = useNavigation();
    const initialDeviceCoordinatesRef = useRef(null);
    const initialCameraSetRef = useRef(false);
    const {carLocation, saveCarLocation, removeCarLocation} = useCarLocation();

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
                    navigation.goBack();
                }

                locationSubscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 2000,
                        distanceInterval: 1,
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
    

    const goToCarLocation = () => {
        if (carLocation) {
          cameraRef.current.setCamera({
            centerCoordinate: [carLocation.longitude, carLocation.latitude],
            zoomLevel: 16,
            animationDuration: 500,
          });
        }
      };
      
    const goToExpoactiva = () => {
        cameraRef.current.setCamera({
            centerCoordinate: [EXPOACTIVA_MARKER_LONGITUD, EXPOACTIVA_MARKER_LATITUD],
            zoomLevel: 15.5,
            animationDuration: 500,
        });
    };

    const centerCamera = () => {
        console.log('deviceCoordinates', deviceCoordinates)
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
                "Eliminar marca",
                "¿Estás seguro de que quieres eliminar la marca de tu vehículo?",
                [
                    {
                        text: "Cancelar",
                        onPress: () => console.log("Cancelado"),
                        style: "cancel"
                    },
                    {
                        text: "Eliminar",
                        onPress: async () => {
                            removeCarLocation(); // Usar removeCarLocation del contexto
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
            saveCarLocation(coordinatesToSave); // Usar saveCarLocation del contexto
        }
    };

    return (
        <View style={{flex: 1}}>
        <Mapbox.MapView
            zoomLevel={15}
            centerCoordinate={[0,0]}
            style={{flex: 1}}
            pitchEnabled={false} 
            attributionEnabled={false} 
            logoEnabled={false} 
            styleURL='mapbox://styles/lazaroborghi/cln8wy7yk07c001qb4r5h2yrg' 
            scaleBarEnabled={false}
        >   
            <Mapbox.UserLocation minDisplacement={0.5} visible={true} renderMode={'normal'} showsUserHeadingIndicator={true} />
            <Mapbox.Camera
                ref={cameraRef}
                centerCoordinate={carLocation ? [carLocation.longitude, carLocation.latitude] : initialDeviceCoordinatesRef.current}
                zoomLevel={15.6}
                animationDuration={500}
                maxZoomLevel={17}
            />
            <Mapbox.Images images={iconImages} />
            {carLocation ? (
                    <CarMarker deviceCoordinates={[carLocation.longitude, carLocation.latitude]} onCarPress={goToCarLocation} />
            ) : (
                <ExpoactivaMarker goToExpoactiva={goToExpoactiva} />
            )}

        </Mapbox.MapView>
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
                }
            ]}
        >
            <MaterialCommunityIcons name="car" color={carLocation ? 'darkgreen' : 'gray'} size={24} />
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
                }
            ]}
        >
            <MaterialCommunityIcons name="crosshairs-gps" color="darkgreen" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
                onPress={toggleCarMarker}
                style={[
                    styles.searchButton,
                    {
                        bottom: 20,
                        left: '25%',
                        transform: [{ translateX: -75 }],
                        padding:  15,
                        width:  200,
                        opacity:  0.85,
                    }
                ]}
            >   
            <View style={{flex:1, flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems:'center'}}>
                <MaterialCommunityIcons
                    name={carLocation ? "car-off" : "car"}
                    size={24}
                    color={carLocation ? "red" : "darkgreen"}
                />
                { carLocation ? <Text style={{fontSize: 17, fontWeight: '500', color: 'red'}}>Eliminar marca</Text> : <Text style={{fontSize: 17, fontWeight: '500', color: 'darkgreen'}}>Marcar mi vehículo</Text> }
            </View>
            </TouchableOpacity>
        </View>
    );
}