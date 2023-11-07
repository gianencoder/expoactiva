import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Image, Share } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { dateFormmater } from '../util/utils';
import { ThemeContext } from '../context/themeContext/ThemeContext';


interface Props {
    ticket: Ticket,
    qrCode: string,
    method: () => void
    props?: []

}

export const TicketComponent = ({ ticket, qrCode, method, props }: Props) => {

    const onShare = async (code: string) => {
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
        >
            <View style={ticketStyles.listTicketContainer}>
                <View style={ticketStyles.imgContainer}>
                    <View style={{ flex: 1, borderRadius: 20, justifyContent: 'center' }}>
                        <QRCode
                            value={qrCode}
                            size={80}
                            // You can customize the appearance of the QR code using props like color, backgroundColor, etc.
                            // Example:
                            color={theme.colors.text}
                            backgroundColor="transparent"
                        />
                    </View>
                </View>

                <View style={ticketStyles.infoContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: theme.colors.text }}>Expoactiva Nacional Soriano</Text>
                        <TouchableOpacity onPress={() => onShare(ticket.qrCode)} hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}>
                            <Image style={{ height: 18, width: 18, alignSelf: 'flex-end' }} source={require('../assets/icons/share.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={{ color: theme.colors.text }}>Entrada {ticket.state ? 'Válida' : 'No válida'}</Text>
                    <Text style={{ color: theme.colors.text }}>Usted {ticket.in ? 'ya ingreso' : 'no ha ingreso'}</Text>
                    <Text style={{ color: theme.colors.text }}>Válida hasta  {dateFormmater(ticket.expireDate).formattedDate} </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
