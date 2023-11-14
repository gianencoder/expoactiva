import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Share, Image } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useTicketManager } from '../hooks/useTicketManager';

export const TicketComponent = ({ ticket, qrCode, method }) => {

    const { theme } = useContext(ThemeContext)
    const { shareTicket } = useTicketManager()

    const isTicketShared = ticket.shared

    useEffect(() => {
        console.log('ticket', ticket)
    }, [isTicketShared])

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={!isTicketShared ? method : () => {}}
            disabled={isTicketShared}
            style={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <View style={ticketStyles.listTicketContainer}>
                <View style={ticketStyles.imgContainer}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <QRCode
                            value={qrCode}
                            size={80}
                            color={isTicketShared ? 'gray' : theme.colors.text}
                            backgroundColor="transparent"
                        />
                        {isTicketShared && <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)'}} />}
                    </View>
                </View>

                <View style={ticketStyles.infoContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}>
                        <Text style={{ color: isTicketShared ? theme.customColors.subtitles : theme.colors.text, fontSize: 15, fontWeight: '500' }}>Expoactiva Nacional Soriano</Text>
                        <TouchableOpacity 
                            onPress={() => !isTicketShared && shareTicket(ticket.ticketId)}
                            disabled={isTicketShared}
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                            <Image 
                                style={{ 
                                    height: 20, 
                                    width: 20, 
                                    alignSelf: 'flex-end', 
                                    tintColor: isTicketShared ? 'lightgray' : theme.customColors.activeColor 
                                }} 
                                source={require('../assets/icons/share.png')} 
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: theme.customColors.subtitles }}>Entrada {isTicketShared ? 'compartida' : ticket.used ? 'no válida' : 'válida'}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
