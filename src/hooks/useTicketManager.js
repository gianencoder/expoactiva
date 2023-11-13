import React, { useState, useEffect, useCallback } from 'react'
import { useNavigation } from "@react-navigation/native"
import axios from 'axios'
import properties from '../../properties.json'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { usePayment } from '../context/PaymentContext/PaymentContext'
import { useRedeemTicket } from '../context/RedeemTicketContext/RedeemTicketContext'

export const useTicketManager = () => {
    const { user, token } = useAuthContext()
    const [quantity, setQuantity] = useState(1)
    const navigation = useNavigation()
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setPayment, setPaymentAttempt, paymentAttempt } = usePayment()
    const { setClaimedTicket, setRedeemTicketAttempt, redeemTicketAttempt } = useRedeemTicket()

    const purchaseTicket = useCallback(async () => {
        try {

            setLoading(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const body = { email: user.email, quantity };
            console.log('body', body)
            const response = await axios.post(`${properties.prod}tickets/purchase`, body);
            
            console.log('response', response.data)

            
            if (response.data.data) {
                setPayment(true);
                navigation.goBack()
            } else {
                setPayment(false);
                setPaymentAttempt(!paymentAttempt);
            }
            
            

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
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.get(`${properties.prod}tickets/${user.email}`);

            setTickets(response.data);

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


    const redeemTicket = async (code) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}tickets/update/${code}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email
                }),
            })

            if (response.status === 200) {
                
                setClaimedTicket(true)
                navigation.goBack()
            }
            if (response.status === 404) {
                setClaimedTicket(false)
                setRedeemTicketAttempt(!redeemTicketAttempt)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoading(false)
        }
    }

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
    })
}




