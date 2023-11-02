import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import QRCode from "react-native-qrcode-svg";
import { useRoute } from '@react-navigation/native';

export const TicketDetail = () => {

    const { theme } = useContext(ThemeContext)
    const route = useRoute()

    const { qrCode }: any = route.params
    console.log(qrCode)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>

            <View style={{
                height: 500, width: '90%'
                , justifyContent: 'center'
                , alignItems: 'center'
                , backgroundColor: theme.colors.background
                , borderRadius: 15
                , shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.4,
                shadowRadius: 16.00,

                elevation: 18,
            }}>
                {qrCode !== undefined

                    ? 
                    <View style={{flex: 1, alignItems:'center', justifyContent: 'space-evenly', paddingHorizontal:20}}>
                        <QRCode
                            value={qrCode}
                            size={215}
                            color={theme.colors.text}
                            backgroundColor="transparent"
                        />
                        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '400', textAlign: 'center'}}>Presentar QR en la entrada al predio para ingresar</Text>
                    </View>
                    :
                    <View><Text>Codigo QR no válido</Text></View>
                }

            </View>
        </View >
    )
}
