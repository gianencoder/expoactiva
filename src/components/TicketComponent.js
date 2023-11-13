import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Share, Image } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const TicketComponent = ({ ticket, qrCode, method }) => {

    const onShare = async (code) => {
        const result = await Share.share({ message: `Canjea el siguiente código en la aplicación de Expoactiva para recibir tu entrada: ${"\n"}${"\n"} ${code}` })

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('shared', result.activityType)
            } else {
                console.log('error')
            }
        }
    }

    const { theme } = useContext(ThemeContext)
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={method}
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={ticketStyles.listTicketContainer}>
                <View style={ticketStyles.imgContainer}>
                    <View style={{ flex: 1, borderRadius: 20, justifyContent: 'center' }}>
                        <QRCode
                            value={qrCode}
                            size={80}
                            color={theme.colors.text}
                            backgroundColor="transparent"
                        />
                    </View>
                </View>

                <View style={ticketStyles.infoContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}>
                        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: '500' }}>Expoactiva Nacional Soriano</Text>
                        <TouchableOpacity onPress={() => onShare(ticket.ticketId)} hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                            <Image style={{ height: 22, width: 22, alignSelf: 'flex-end', tintColor: theme.customColors.activeColor }} source={require('../assets/icons/share.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={{ color: theme.customColors.subtitles }}>Entrada {ticket.used ? 'No válida' : 'Válida'}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
