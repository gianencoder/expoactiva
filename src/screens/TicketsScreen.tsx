import { View, Text, TouchableOpacity, Image, Share, FlatList } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext, useEffect, useCallback } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useTicketManager } from '../functions/useTicketManager';

export const TicketsScreen = () => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { tickets, ticketDetail } = useTicketManager()

    return (
        tickets.length > 0

            ?
            <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>

                <View style={ticketStyles.topSide}>
                    <View style={{ width: '100%', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 5 }}>
                        <Text style={{ fontSize: 30, fontFamily: 'verdana', color: theme.colors.text }}>Mis entradas</Text>
                    </View>

                    <View style={{width: '100%', height: '90%'}}>
                        <FlatList
                            data={tickets}
                            extraData={tickets}
                            renderItem={({ item }: any) => <TicketComponent key={item.ticketId} ticket={item} qrCode={item.ticketId} method={() => ticketDetail(item.ticketId)} />}
                            ItemSeparatorComponent={() => <SeparatorComponent />}
                        />
                    </View>
                </View>

                <View style={{ ...ticketStyles.bottomSide }}>

                    <View style={{ ...ticketStyles.topSideComplements, backgroundColor: theme.colors.background }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('BuyTicket')}
                            style={{
                                backgroundColor: theme.customColors.buttonColor
                                , height: 50
                                , width: '90%'
                                , borderRadius: 10
                                , justifyContent: 'center'
                                , alignItems: 'center'
                            }}>
                            <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>COMPRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
            :
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>

                <Image style={{ width: '50%', height: '50%', position: 'absolute' }} source={require('../assets/images/sin-resultado.png')} />

                <View style={{ height: '80%', alignItems: 'center', justifyContent: 'flex-end', width: '100%', gap: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'gray' }}>Usted aun no ha comprado entradas</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BuyTicket')}
                        style={{
                            backgroundColor: theme.customColors.buttonColor
                            , height: 40
                            , width: '90%'
                            , borderRadius: 10
                            , justifyContent: 'center'
                            , alignItems: 'center'
                        }}>
                        <Text style={{ ...ticketStyles.btt, color: 'white', letterSpacing: 1 }}>PRESIONE AQUÍ PARA COMPRAR</Text>
                    </TouchableOpacity>
                </View>

            </View>
    )
}
