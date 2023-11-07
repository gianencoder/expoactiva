import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from "@react-navigation/native"
import useTickets from '../hooks/useTickets'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const TicketFunction = () => {
    const [email, setEmail] = useState('')
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    
    const { tickets, loading, fetchTickets } = useTickets({ email })

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

    useEffect(() => {
        if (email) {
            fetchTickets();
        }
    }, [email]);

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

        if (code === 1 && total > 0) {
            setTotal(previousNumber => previousNumber - 1)
        }
    }

    return ({
        tickets
        , ticketDetail
        , total
        , operations
        , loading
    })
}




