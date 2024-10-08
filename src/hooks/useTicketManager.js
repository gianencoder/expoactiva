import React, { useState, useCallback } from 'react'
import { Share } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import axios from 'axios'
import properties from '../../properties.json'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { usePayment } from '../context/PaymentContext/PaymentContext'
import { useRedeemTicket } from '../context/RedeemTicketContext/RedeemTicketContext'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';
import Constants from 'expo-constants';

const apikey = Constants.expoConfig.extra.apikey

export const useTicketManager = (ticket = null) => {
    const { user, token } = useAuthContext()
    const [quantity, setQuantity] = useState(1)
    const navigation = useNavigation()
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setPayment, setPaymentAttempt, paymentAttempt } = usePayment()
    const { setClaimedTicket, setRedeemTicketAttempt } = useRedeemTicket()
    const [isTicketShared, setIsTicketShared] = useState(ticket ? ticket.shared : false)
    const indexPage = navigation.getState().index
    const { languageState } = useLanguage();
    const [translation, setTranslation] = React.useState(translations.es);
    React.useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    const purchaseTicket = useCallback(async () => {
        try {

            setLoading(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['apikey'] = apikey;
            const body = { email: user.email, quantity };

            const response = await axios.post(`${properties.prod}tickets/purchase`, body);



            if (response.data.data) {
                setPayment(true);
                navigation.goBack()
            } else {

                setPayment(false);
            }

            console.log('paymentAttempt', paymentAttempt)
            setPaymentAttempt(currentAttempt => !currentAttempt)


        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    }, [quantity, user?.email, token, navigation, indexPage]);


    const fetchTickets = useCallback(async () => {
        setLoading(true);
        const ticketsKey = `@tickets_${user.email}`;

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.defaults.headers.common['apikey'] = apikey;
            const response = await axios.get(`${properties.prod}tickets/${user.email}`);

            // Si la respuesta es exitosa, primero actualiza los tickets en el estado
            if (response.data) {
                setTickets(response.data);

                // Luego borra las entradas antiguas de AsyncStorage
                await AsyncStorage.removeItem(ticketsKey);

                // Y finalmente almacena los nuevos tickets
                await AsyncStorage.setItem(ticketsKey, JSON.stringify(response.data));
            }
        } catch (err) {
            console.log('Error al obtener tickets desde la API, intentando cargar desde AsyncStorage:', err);

            // Intenta cargar los tickets desde AsyncStorage si hay un error
            const storedTicketsString = await AsyncStorage.getItem(ticketsKey);
            if (storedTicketsString) {
                const storedTickets = JSON.parse(storedTicketsString);
                setTickets(storedTickets);
            } else {
                setError(err.response ? err.response.data.error : err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [user?.email, token]);


    const ticketDetail = useCallback((id) => {
        try {
            const selectedTicket = tickets.find(ex => ex.ticketId === id)
            console.log('selectedTicket', selectedTicket)
            if (selectedTicket === null) {
                return false
            }
            navigation.navigate('TicketDetail2', {
                qrCode: selectedTicket?.ticketId
            })

        } catch (error) {
            throw new Error('No se pudo seleccionar el objeto')
        }
    }, [tickets, navigation]);

    const operations = useCallback((code) => {
        if (code == 0 && quantity < 6) {
            setQuantity(previousNumber => previousNumber + 1)
        }

        if (code === 1 && quantity > 1) {
            setQuantity(previousNumber => previousNumber - 1)
        }
    }, [quantity]);


    const redeemTicket = async (code) => {
        setLoading(true)
        try {
            console.log('code', code)
            const response = await fetch(`${properties.prod}tickets/update/${code}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json',
                    'apikey': apikey
                },
                body: JSON.stringify({
                    email: user.email,
                    shared: false,
                    redeem: true
                }),
            })

            if (response.status === 200) {

                setClaimedTicket(true)
                setIsTicketShared(false)
                console.log('isTicketShared', isTicketShared)
                navigation.goBack()

            } else {
                setClaimedTicket(false)
                setRedeemTicketAttempt(currentAttempt => !currentAttempt)
            }

        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }

    const shareTicket = async (code) => {
        try {
            const updateTicketStatus = async () => {
                const response = await fetch(`${properties.prod}tickets/update/${code}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'apikey': apikey
                    },
                    body: JSON.stringify({
                        shared: true
                    }),
                });
                return response.status === 200;
            };

            const proceedWithSharing = async () => {
                const result = await Share.share({
                    message: `${translation.ticketAlert.proceedWithSharing}:${"\n"}${"\n"}${code}`
                });

                if (Platform.OS === 'ios' && result.action === Share.sharedAction) {
                    if (result.activityType) {
                        if (await updateTicketStatus()) {
                            Alert.alert(translation.ticketAlert.iosShareSuccessTitle, translation.ticketAlert.iosShareSuccessMessage);
                            setIsTicketShared(true);
                        } else {
                            console.log('error en la API');
                        }
                    } else {
                        console.log('error al compartir');
                    }
                }
            };

            if (Platform.OS === 'android') {
                Alert.alert(
                    translation.ticketAlert.androidShareConfirmationTitle,
                    translation.ticketAlert.androidShareConfirmationMessage,
                    [
                        { text: 'No', onPress: () => console.log('Compartir cancelado'), style: 'cancel' },
                        {
                            text: 'Sí', onPress: async () => {
                                if (await updateTicketStatus()) {
                                    setIsTicketShared(true);
                                    proceedWithSharing();
                                } else {
                                    console.log('error en la API');
                                }
                            }
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                proceedWithSharing();
            }
        } catch (error) {
            console.log('error', error);
            Alert.alert(translation.ticketAlert.generalErrorTitle, translation.ticketAlert.generalErrorMessage);
        }
    };


    return ({
        tickets
        , ticketDetail
        , quantity
        , operations
        , loading
        , error
        , purchaseTicket
        , fetchTickets
        , redeemTicket
        , shareTicket
        , isTicketShared
    })
}




