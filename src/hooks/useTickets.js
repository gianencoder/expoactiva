import { useState } from 'react';
import axios from 'axios';
import properties from '../../properties.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useTickets({ email, quantity = 0 }) {
    
    console.log('email', email)
    console.log('quantity', quantity)

    const [payment, setPayment] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const purchaseTicket = async () => {
        if (quantity === 0) {
            return;
        }
        try {
            setLoading(true);

            const tokenString = await AsyncStorage.getItem('AccessToken');
            console.log('tokenString', tokenString)

            // sacarle las comillas al token
            const token = tokenString.replace(/['"]+/g, '');
            console.log('token', token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const body = { email, quantity };
            console.log('body', body)
            const response = await axios.post(`${properties.cyberSoftURL}tickets/purchase`, body);
            
            console.log('response', response.data)

            setTickets(response.data.tickets);
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
            setTickets(response.data.tickets);
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    };

    return { tickets, payment, error, loading, purchaseTicket, fetchTickets };
}
