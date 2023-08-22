import React, { useEffect, useState } from 'react'
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps';
import { LoadingScreen } from './LoadingScreen';
import { mapsTheme } from '../theme/MapsTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export const GoToPlaceScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject>()
    const [isLoading, setIsloading] = useState(true)
    const endLatitude = -33.44588764457755
    const endLongitude = -57.90633102633074


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


    const wazeNavigate = () => {
        const wazeUrl = `waze://?ll=${endLatitude},${endLongitude}&navigate=yes`;
        Linking.openURL(wazeUrl)
            .catch(() => {
                const webUrl = `https://www.waze.com/ul?ll=${endLatitude},${endLongitude}&navigate=yes`;
                Linking.openURL(webUrl);
            });
    };

    const iosNavigate = () => {
        const iosUrl = `http://maps.apple.com/?saddr=${location?.coords.latitude},${location?.coords.longitude}&daddr=${endLatitude},${endLongitude}`

        Linking.openURL(iosUrl)
            .catch(() => {
                const webUrl = `https://www.apple.com/maps/dir/?daddr=${endLatitude},${endLongitude}`;
                Linking.openURL(webUrl);
            })
    }

    const androidNavigate = () => {
        const androidUrl = `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${endLatitude},${endLongitude}`
        Linking.openURL(androidUrl)
            .catch(() => {
                const webUrl = `https://www.google.com/maps/place/${endLongitude},${endLongitude}`
                Linking.openURL(webUrl)
            })
    }

    return (

        isLoading
            ? <LoadingScreen></LoadingScreen>
            : <View style={mapsTheme.container}>
                <View style={mapsTheme.buttonsContainer}>
                    <TouchableOpacity style={mapsTheme.googleBtn}
                        onPress={androidNavigate}
                    >
                        <Image style={{ width: 50, height: 50 }} source={require('../assets/googleMaps.png')} />
                        <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={mapsTheme.appleBtn}
                        onPress={iosNavigate}
                    >
                        <Image style={{ width: 60, height: 60 }} source={require('../assets/appleMaps.png')} />
                        <Text style={mapsTheme.txtBtn}>Ir con Apple maps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={mapsTheme.wazeBtn}
                        onPress={wazeNavigate}
                    >
                        <Image style={{ width: 40, height: 40 }} source={require('../assets/wazeMaps.png')} />
                        <Text style={mapsTheme.txtBtn}>Ir con Waze</Text>
                    </TouchableOpacity>
                </View>
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
