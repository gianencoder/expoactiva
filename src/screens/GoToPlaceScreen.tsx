import React, { useEffect } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { mapsTheme } from '../theme/MapsTheme';
import { GoToPlaceFunction } from '../functions/GoToPlaceFunction';
import { Ionicons } from '@expo/vector-icons';

export const GoToPlaceScreen = () => {

    const { androidNavigate, iosNavigate, wazeNavigate, showModal, modal, setModal } = GoToPlaceFunction()

    useEffect(() => {
        setModal(true)
    }, [])


    return (

        <Modal visible={modal} animationType='fade' transparent={true}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>


                <View style={{
                    width: '80%', backgroundColor: 'white', height: 400, borderRadius: 20, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,

                    elevation: 24,
                }}>

                    <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'flex-end', padding: 25 }} onPress={showModal}>
                        <Ionicons name="ios-close-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={mapsTheme.googleBtn}
                            onPress={androidNavigate}
                        >
                            <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/googleMaps.png')} />
                            <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={mapsTheme.appleBtn}
                            onPress={iosNavigate}
                        >
                            <Image style={{ width: 50, height: 50, borderRadius: 10 }} source={require('../assets/icons/appleMaps.png')} />
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
            </View>

        </Modal>
        // <View style={mapsTheme.container}>
        //     <View style={mapsTheme.buttonsContainer}>
        //         <TouchableOpacity style={mapsTheme.googleBtn}
        //             onPress={androidNavigate}
        //         >
        //             <Image style={{ width: 50, height: 50 }} source={require('../assets/icons/googleMaps.png')} />
        //             <Text style={mapsTheme.googleTxt}>Ir con Google Maps</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity style={mapsTheme.appleBtn}
        //             onPress={iosNavigate}
        //         >
        //             <Image style={{ width: 60, height: 60 }} source={require('../assets/icons/appleMaps.png')} />
        //             <Text style={mapsTheme.txtBtn}>Ir con Apple maps</Text>
        //         </TouchableOpacity>

        //         <TouchableOpacity style={mapsTheme.wazeBtn}
        //             onPress={wazeNavigate}
        //         >
        //             <Image style={{ width: 40, height: 40 }} source={require('../assets/icons/wazeMaps.png')} />
        //             <Text style={mapsTheme.txtBtn}>Ir con Waze</Text>
        //         </TouchableOpacity>
        //     </View>
        // </View>
    )
}
