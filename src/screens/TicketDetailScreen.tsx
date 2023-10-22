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
                height: 400, width: '90%'
                , justifyContent: 'center'
                , alignItems: 'center'
                , backgroundColor: theme.colors.background
                , borderRadius: 15
                , shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.00,

                elevation: 24,
            }}>
                {qrCode !== undefined

                    ? <QRCode
                        value={qrCode}
                        size={230}
                        // You can customize the appearance of the QR code using props like color, backgroundColor, etc.
                        // Example:
                        color={theme.colors.text}
                        backgroundColor="transparent"
                    />
                    :
                    <View><Text>Codigo QR no válido</Text></View>
                }

            </View>
        </View >
    )
}
