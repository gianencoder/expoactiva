import { useState } from 'react';
import axios from 'axios';
import properties from '../../properties.json'

export default function useTickets({ email, quantity = 0 }) {
    
    const [payment, setPayment] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const purchaseTicket = async () => {
        try {
            setLoading(true);
            const body = { email, quantity };
            const response = await axios.post(`${properties.cyberSoftURL}/tickets/purchase`, body);
            setTickets(response.data.tickets);
            setPayment(true);
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${properties.cyberSoftURL}/tickets/${email}`);
            setTickets(response.data.tickets);
        } catch (err) {
            setError(err.response ? err.response.data.error : err.message);
        } finally {
            setLoading(false);
        }
    };

    return { tickets, payment, error, loading, purchaseTicket, fetchTickets };
}
