import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import properties from '../../properties.json'

export const useTicketManager = () => {
    const [email, setEmail] = useState('')
    const [total, setTotal] = useState(1)
    const navigation = useNavigation()
    const [payment, setPayment] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email) {
            fetchTickets();
        }
    }, [email]);

    const purchaseTicket = async () => {
        try {
            setLoading(true);

            const tokenString = await AsyncStorage.getItem('AccessToken');
            console.log('tokenString', tokenString)

            // sacarle las comillas al token
            const token = tokenString.replace(/['"]+/g, '');
            console.log('token', token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const body = { email, total };
            console.log('body', body)
            const response = await axios.post(`${properties.cyberSoftURL}tickets/purchase`, body);
            
            await fetchTickets();
            console.log('response', response.data)

            setPayment(response.data.data);
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            setLoading(true);

            const tokenString = await AsyncStorage.getItem('AccessToken');
            console.log('tokenString', tokenString)

            // sacarle las comillas al token
            const token = tokenString.replace(/['"]+/g, '');
            console.log('token', token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${properties.cyberSoftURL}tickets/${email}`);
            console.log('ticketsActualizados', response.data.tickets)
            setTickets(response.data.tickets);
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    };

    const getEmailFromStorage = useCallback(async () => {
        try {
            const userJson = await AsyncStorage.getItem('UserLoggedIn');
            const user = JSON.parse(userJson);
            setEmail(user?.email || '');
        } catch (err) {
            console.error('Error al obtener el email:', err);
        }
    }, []);

    useEffect(() => {
        getEmailFromStorage();
    }, [getEmailFromStorage]);

    const ticketDetail = (id) => {
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
    }

    const operations = (code) => {
        if (code == 0 && total < 6) {
            setTotal(previousNumber => previousNumber + 1)
        }

        if (code === 1 && total > 1) {
            setTotal(previousNumber => previousNumber - 1)
        }
    }

    return ({
        tickets
        , ticketDetail
        , total
        , operations
        , loading
        , payment
        , error
        , purchaseTicket
        , fetchTickets
    })
}




