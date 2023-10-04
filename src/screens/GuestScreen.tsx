import React from 'react'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { MyColors } from '../theme/ColorsTheme'



export const GuestScreen = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: MyColors.white,
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 80,

        }}>
            <View style={{
                justifyContent: 'center', backgroundColor: 'white', alignItems: 'center', width: 350, height: 500, borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,

                elevation: 24,


            }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Image source={require('../assets/icons/mainIcon.png')} style={{ width: 160, height: 80, }} />
                </View>

                <View style={{
                    flex: 1,
                    gap: 25,
                }}>
                    <TouchableOpacity activeOpacity={0.6} onPress={(() => Alert.alert("Yendo a Home screen", "..."))}>
                        <View style={{
                            backgroundColor: MyColors.primary, width: 250, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,

                            elevation: 24,

                        }}>
                            <Text style={{ color: MyColors.white, fontSize: 15, fontWeight: '600' }}>Ingresar/crear cuenta</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={(() => Alert.alert("Yendo a Home screen", "..."))} onLongPress={() => console.log(Alert.alert("Aprete mas fuerte"))}>
                        <View style={{
                            backgroundColor: MyColors.white, width: 250, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: MyColors.white, borderWidth: 1,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,

                            elevation: 24,

                        }}>
                            <Text style={{ color: MyColors.primary, fontSize: 15, fontWeight: '600' }}>Continuar como invitado</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
