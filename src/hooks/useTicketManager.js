import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import properties from '../../properties.json'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { usePayment } from '../context/PaymentContext/PaymentContext'

export const useTicketManager = () => {
    const {user} = useAuthContext()
    const [quantity, setQuantity] = useState(1)
    const navigation = useNavigation()
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { payment, setPayment, setPaymentAttempt } = usePayment();

    const purchaseTicket = useCallback(async () => {
        try {
            
            setLoading(true);

            const tokenString = await AsyncStorage.getItem('AccessToken');

            // sacarle las comillas al token
            const token = tokenString.replace(/['"]+/g, '');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const body = { email: user.email, quantity };
            console.log('body', body)
            const response = await axios.post(`${properties.prod}tickets/purchase`, body);

            console.log('response', response.data.data)

            if (response.data.data) {
                setPayment(true);
                navigation.goBack();
            } else {
                setPayment(false);
            }
            setPaymentAttempt(true);
        
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    }, [quantity, user?.email]);

    const fetchTickets = useCallback(async () => {
        try {
            setLoading(true);

            const tokenString = await AsyncStorage.getItem('AccessToken');

            // sacarle las comillas al token
            const token = tokenString.replace(/['"]+/g, '');

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${properties.prod}tickets/${user.email}`);
            setTickets(response.data.tickets);

        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    }, [user?.email]);

    const ticketDetail = useCallback((id) => {
        try {
            const selectedTicket = tickets.find(ex => ex.ticketId === id)
            console.log('selectedTicket', selectedTicket)
            if (selectedTicket === null) {
                return false
            }
            navigation.navigate('TicketDetail', {
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

    return ({
        tickets
        , ticketDetail
        , quantity
        , operations
        , loading
        , payment
        , error
        , purchaseTicket
        , fetchTickets
        , setPayment
    })
}




