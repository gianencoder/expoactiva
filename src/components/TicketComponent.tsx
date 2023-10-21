import React from 'react'
import { View, Text } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";

interface Props {
    ticket: Ticket,
    qrCode: string
}

export const TicketComponent = ({ ticket, qrCode }: Props) => {


    return (
        <View style={ticketStyles.listTicketContainer}>

            <View style={ticketStyles.imgContainer}>
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <QRCode
                        value={qrCode}
                        size={200}
                    // You can customize the appearance of the QR code using props like color, backgroundColor, etc.
                    // Example:
                    // color="black"
                    // backgroundColor="white"
                    />
                </View>
            </View>

            <View style={ticketStyles.infoContainer}>
                <Text>Expoactiva Nacional Soriano</Text>
                <Text>Entrada {ticket.state ? 'Válida' : 'No válida'}</Text>
                <Text>Usted {ticket.in ? 'ya ingreso' : 'no ha ingreso'}</Text>
                <Text><Date>{ticket.expireDate}</Date></Text>
            </View>

        </View>
    )
}
