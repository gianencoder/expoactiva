import React, { useEffect, useState } from 'react'
import { Text, View, Alert, Linking } from 'react-native'
import * as Location from 'expo-location'
import { StackScreenProps } from '@react-navigation/stack'
import { LoadingScreen } from './LoadingScreen'
import MapView, { Marker } from 'react-native-maps';
interface Props extends StackScreenProps<any, any> { }

export const WhereIsMyCarScreen = ({ navigation }: Props) => {
    const [location, setLocation] = useState<Location.LocationObject>()
    const [isLoading, setIsLoading] = useState(true)

    const openLocationSettings = async () => {
        await Linking.openSettings();
    };

    // //  GUARDA LONGITUD Y LATITUD DEL USUARIO
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                Alert.alert("Permiso denegado",
                    "Debes habilitar los permisos de ubicación para esta funcionalidad",
                    [{ text: "Cancelar", onPress: () => navigation.goBack() }, { text: "Aceptar", onPress: () => openLocationSettings() }])
                console.log('Grant permission before')
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        }
        getPermissions()
    }, [])

    console.log(location?.coords.longitude)
    console.log(location?.coords.latitude)

    useEffect(() => {
        if (location?.coords.latitude && location?.coords.longitude != undefined) {
            setIsLoading(false)
        }
    }, [location])

    return (

        isLoading ? <LoadingScreen></LoadingScreen> :
            <MapView
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}

                style={{ flex: 1 }}
            >

                <Marker
                    coordinate={{ latitude: location?.coords.latitude, longitude: location?.coords.longitude }}

                />
            </MapView>
    )

}
