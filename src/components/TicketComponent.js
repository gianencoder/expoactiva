import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { ThemeContext } from '../context/themeContext/ThemeContext';

export const TicketComponent = ({ ticket, qrCode, method }) => {

    const { theme } = useContext(ThemeContext)
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={method}
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
                    <Text style={{ color: theme.colors.text }}>Expoactiva Nacional Soriano</Text>
                    <Text style={{ color: theme.colors.text }}>Entrada {ticket.used ? 'Válida' : 'No válida'}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
