import React from 'react'
import { Linking } from 'react-native';

export const GoToPlaceFunction = () => {
    const endLatitude = -33.44588764457755
    const endLongitude = -57.90633102633074


    // //  GUARDA LONGITUD Y LATITUD DEL USUARIO
    // useEffect(() => {
    //     const getPermissions = async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync()
    //         if (status !== 'granted') {
    //             console.log('Grant permission before')
    //             return;
    //         }
    //         let currentLocation = await Location.getCurrentPositionAsync({});
    //         setLocation(currentLocation);
    //     }
    //     getPermissions()
    // }, [])

    // console.log(location?.coords.longitude)
    // console.log(location?.coords.latitude)

    // useEffect(() => {
    //     if (location?.coords.latitude && location?.coords.longitude != undefined) {
    //         setIsloading(false)
    //     }
    // }, [location])


    const wazeNavigate = () => {
        const wazeUrl = `waze://?ll=${endLatitude},${endLongitude}&navigate=yes`;
        Linking.openURL(wazeUrl)
            .catch(() => {
                const webUrl = `https://www.waze.com/ul?ll=${endLatitude},${endLongitude}&navigate=yes`;
                Linking.openURL(webUrl);
            });
    };

    const iosNavigate = () => {
        const iosUrl = `http://maps.apple.com/?daddr=${endLatitude},${endLongitude}`

        Linking.openURL(iosUrl)
            .catch(() => {
                const webUrl = `https://www.apple.com/maps/dir/?daddr=${endLatitude},${endLongitude}`;
                Linking.openURL(webUrl);
            })
    }

    const androidNavigate = () => {
        const androidUrl = `https://www.google.com/maps/dir/?api=1&destination=${endLatitude},${endLongitude}`
        Linking.openURL(androidUrl)
            .catch(() => {
                const webUrl = `https://www.google.com/maps/place/${endLongitude},${endLongitude}`
                Linking.openURL(webUrl)
            })
    }
    return ({
        androidNavigate,
        iosNavigate,
        wazeNavigate
    })
}
