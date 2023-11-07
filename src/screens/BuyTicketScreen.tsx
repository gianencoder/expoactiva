import React, { useContext, useState } from 'react'
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { TicketFunction } from '../functions/TicketFunction'

export const BuyTicketScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { height } = useWindowDimensions()
    const { total, operations } = TicketFunction()
    const [price] = useState(250)
    
    return (

        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>

            <View style={{ ...ticketStyles.btv, flex: 2 }}>
                <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/Expoactiva.jpg')} />
            </View>


            <View style={{ ...ticketStyles.btv, backgroundColor: theme.colors.background, padding: 10, gap: 15 }}>
                <Text style={{ ...ticketStyles.btt, alignSelf: 'flex-start', color: theme.colors.text, fontWeight: 'bold' }}>Expoactiva Nacional</Text>

                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...ticketStyles.btt, color: theme.colors.text }}>Cantidad</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => operations(1)} style={{ ...ticketStyles.tbtn, backgroundColor: theme.dividerColor, height: height / 25 }}>
                            <Text style={{ ...ticketStyles.btt, color: 'white', fontSize: height / 40 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ color: theme.colors.text, fontSize: height / 30 }}>{total}</Text>

                        <TouchableOpacity onPress={() => operations(0)} style={{ ...ticketStyles.tbtn, backgroundColor: theme.dividerColor, height: height / 25 }}>
                            <Text style={{ ...ticketStyles.btt, color: 'white', fontSize: height / 40 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-start', width: '100%' }}>
                    <Text style={{ ...ticketStyles.btt, color: theme.colors.text, fontWeight: 'bold' }}>TOTAL</Text>
                    <Text style={{ ...ticketStyles.btt, color: theme.colors.text }}>${price * total}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity style={{
                        width: '90%'
                        , height: '100%'
                        , justifyContent: 'center'
                        , backgroundColor: theme.customColors.buttonColor
                        , alignItems: 'center'
                        , borderRadius: 10
                    }}>
                        <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>CONFIRMAR</Text>
                    </TouchableOpacity>


                </View>


            </View>






        </View >
    )
}
