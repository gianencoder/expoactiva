import { View, Text, TouchableOpacity, Image, Share } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { FlashList } from '@shopify/flash-list';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { useNavigation } from '@react-navigation/native'
import { TicketFunction } from '../functions/TicketFunction';


export const TicketsScreen = () => {
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { tickets, ticketDetail } = TicketFunction()


    return (
        tickets.length > 0

            ?
            <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>

                <View style={ticketStyles.topSide}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ fontSize: 30, fontFamily: 'verdana', color: theme.colors.text }}>Mis entradas</Text>
                    </View>

                    <FlashList
                        estimatedItemSize={10}
                        data={tickets}
                        renderItem={({ item }: any) => <TicketComponent ticket={item} qrCode={item.ticketId} method={() => ticketDetail(item.ticketId)} />}
                        ItemSeparatorComponent={() => <SeparatorComponent />}
                    />
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
