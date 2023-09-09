import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { mapsTheme } from '../theme/MapsTheme';
import { GoToPlaceFunction } from '../functions/GoToPlaceFunction';

export const GoToPlaceScreen = () => {
<<<<<<< HEAD
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
=======
>>>>>>> dev

    const { androidNavigate, iosNavigate, wazeNavigate } = GoToPlaceFunction()

    return (
        <View style={mapsTheme.container}>
            <View style={mapsTheme.buttonsContainer}>
                <TouchableOpacity style={mapsTheme.googleBtn}
                    onPress={androidNavigate}
                >
                    <Image style={{ width: 50, height: 50 }} source={require('../assets/icons/googleMaps.png')} />
                    <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity style={mapsTheme.appleBtn}
                    onPress={iosNavigate}
                >
                    <Image style={{ width: 60, height: 60 }} source={require('../assets/icons/appleMaps.png')} />
                    <Text style={mapsTheme.txtBtn}>Ir con Apple maps</Text>
                </TouchableOpacity>

                <TouchableOpacity style={mapsTheme.wazeBtn}
                    onPress={wazeNavigate}
                >
                    <Image style={{ width: 40, height: 40 }} source={require('../assets/icons/wazeMaps.png')} />
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
