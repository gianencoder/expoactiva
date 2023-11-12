import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Share, Image } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const TicketComponent = ({ ticket, qrCode, method }) => {

    const onShare = async (code) => {
        const result = await Share.share({ message: (code) })

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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: theme.colors.text }}>Expoactiva Nacional Soriano</Text>
                        <TouchableOpacity onPress={() => onShare(ticket.ticketId)} hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
                            <Image style={{ height: 18, width: 18, alignSelf: 'flex-end' }} source={require('../assets/icons/share.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={{ color: theme.colors.text }}>Entrada {ticket.used ? 'No válida' : 'Válida'}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
