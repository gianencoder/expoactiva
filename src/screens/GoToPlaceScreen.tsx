import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Location from 'expo-location'


export const GoToPlaceScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject>()

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


    return (
        <View>
            <Text>Go To Place</Text>
        </View>
    )
}
