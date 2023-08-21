import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import { LoadingScreen } from './LoadingScreen';


export const GoToPlaceScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject>()
    const [isLoading, setIsloading] = useState(true)

    //  GUARDA LONGITUD Y LATITUD DEL USUARIO
    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
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
            setIsloading(false)
        }
    }, [location])

    return (
        <View style={{ flex: 1 }}>

            {isLoading ? <LoadingScreen></LoadingScreen> : <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            />}
            <Marker
                coordinate={{
                    latitude: -34.905522156663494,
                    longitude: -56.14871498737667,
                }}
                title="Mi Ubicación"
                description="Estoy aquí!"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});
