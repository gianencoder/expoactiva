import { useEffect, useState } from 'react'
import { Alert, Linking } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export const WhereIsMyCarFunction = () => {

    const [location, setLocation] = useState<Location.LocationObject>()
    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigation();

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
        {
            location,
            isLoading,
            navigation,
        }
    )
}

