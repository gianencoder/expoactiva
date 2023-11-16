import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useTicketManager } from '../hooks/useTicketManager';
import { ToastMessageComponent } from '../components/ToastMessageComponent';
import { usePayment } from '../context/PaymentContext/PaymentContext';
import { useRedeemTicket } from '../context/RedeemTicketContext/RedeemTicketContext';
import { useAuthContext } from '../context/AuthContext/AuthContext';
import { AuthScreen } from './AuthScreen';


export const TicketsScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { isLoggedIn } = useAuthContext()
    const navigation = useNavigation()
    const [showPaymentToast, setShowPaymentToast] = React.useState(false);
    const [showRedeemToast, setShowRedeemToast] = React.useState(false);
    const { tickets, ticketDetail, fetchTickets, loading } = useTicketManager()
    const { payment, setPayment, setPaymentAttempt } = usePayment();
    const { claimedTicket, setClaimedTicket, setRedeemTicketAttempt } = useRedeemTicket();
    const [charging, setCharging] = useState(true)
    const isFocused = useIsFocused();

    useFocusEffect(
        React.useCallback(() => {
            console.log('isFocused', isFocused)
            fetchTickets();
        }, [isFocused])
    );

    useEffect(() => {
        if (!isFocused) {
            setCharging(true)
        }
        setTimeout(() => {
            setCharging(false)
        }, 1500)
    }, [isFocused])


    useFocusEffect(
        React.useCallback(() => {
            console.log('claimed focus', claimedTicket)
            if (claimedTicket) {
                setShowRedeemToast(true)
                setTimeout(() => {
                    setShowRedeemToast(false)
                }, 2800)
                setClaimedTicket(false);
            }
            setRedeemTicketAttempt(false);
        }, [claimedTicket])
    );

    useFocusEffect(
        React.useCallback(() => {
            console.log('payment focus', payment)
            if (payment) {
                setShowPaymentToast(true)
                setTimeout(() => {
                    setShowPaymentToast(false)
                }, 2800)
                setPayment(false);
            }
            setPaymentAttempt(false);
        }, [payment])
    );

    return (
        <>
            {isLoggedIn
                ?
                !charging
                    ?
                    <View style={{ flex: 1 }}>
                        {tickets.length > 0
                            ?
                            <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>
                                <ToastMessageComponent
                                    width={'95%'}
                                    visible={showRedeemToast}
                                    title={'¡Bien hecho!'}
                                    message={'Has recibido tu entrada'}
                                    backgroundColor={theme.customColors.bgSuccesMessage}
                                    iconColor={theme.customColors.colorSuccessMessage}
                                    textColor={theme.customColors.colorSuccessMessage}
                                />
                                <ToastMessageComponent
                                    width={'95%'}
                                    visible={showPaymentToast}
                                    title={'¡Pago recibido!'}
                                    message={'Se ha completado la compra con éxito'}
                                    backgroundColor={theme.customColors.bgSuccesMessage}
                                    iconColor={theme.customColors.colorSuccessMessage}
                                    textColor={theme.customColors.colorSuccessMessage}
                                />
                                <View style={ticketStyles.topSide}>
                                    <View style={{ width: '100%', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 5 }}>
                                        <Text style={{ fontSize: 34, color: theme.colors.text, fontWeight: '300' }}>Mis entradas</Text>
                                    </View>

                                    <View style={{ width: '100%', height: '90%' }}>
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
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 15 }}>

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('BuyTicketScreen2')}
                                                style={{
                                                    backgroundColor: theme.customColors.buttonColor
                                                    , height: 40
                                                    , width: '90%'
                                                    , borderRadius: 10
                                                    , justifyContent: 'center'
                                                    , alignItems: 'center'
                                                }}>
                                                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>COMPRAR</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('ReedemTicketScreen2')}
                                                style={{
                                                    backgroundColor: '#F05950'
                                                    , height: 40
                                                    , width: '90%'
                                                    , borderRadius: 10
                                                    , justifyContent: 'center'
                                                    , alignItems: 'center'
                                                }}>
                                                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>CANJEAR</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                            </View >
                            :
                            <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: theme.colors.background }}>

                                <Image style={{ width: '50%', height: '45%', tintColor: theme.customColors.activeColor }} source={require('../assets/images/sin-resultado.png')} />
                                <Text style={{ fontWeight: '500', fontSize: 24, color: theme.customColors.subtitles }}>No tienes entradas disponibles</Text>

                                <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', gap: 15 }}>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('BuyTicketScreen2')}
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
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ReedemTicketScreen2')}
                                        style={{
                                            backgroundColor: '#F05950'
                                            , height: 40
                                            , width: '90%'
                                            , borderRadius: 10
                                            , justifyContent: 'center'
                                            , alignItems: 'center'
                                        }}>
                                        <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>CANJEAR CON CÓDIGO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                    </View>
                    : <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', gap: 15 }}>
                        <ActivityIndicator size={'large'} color={theme.customColors.activeColor} />
                        <Text style={{ fontSize: 18, color: theme.colors.text }}>Cargando entradas...</Text>
                    </View>
                : <AuthScreen />
            }
        </>
    )
}

