import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native"
import useTickets from '../hooks/useTickets'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const TicketFunction = () => {
    const [email, setEmail] = useState('')
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    
    const { tickets, loading, fetchTickets } = useTickets({ email })

    useEffect(() => {
        const getEmailFromStorage = async () => {
          try {
            const user = await AsyncStorage.getItem('UserLoggedIn');
            const storedEmail = user ? JSON.parse(user).email : null;
            console.log('storedEmail', storedEmail);
            if (storedEmail !== null) {
              setEmail(storedEmail);
            }
          } catch (err) {
            console.log('Error al obtener el email:', err);
          }
        };
    
        getEmailFromStorage();
      }, []);
    
    useEffect(() => {
        if (email) {
            fetchTickets();
        }
    }, [email, fetchTickets]);

    const ticketDetail = (id) => {
        try {
            const selectedTicket = tickets.find(ex => ex.ticketId === id)
            if (selectedTicket === null) {
                return false
            }
            navigation.navigate('TicketDetail', {
                qrCode: selectedTicket?.qrCode
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




