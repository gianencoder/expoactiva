import React, { createContext, useState, useContext } from 'react';

export const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
    const [payment, setPayment] = useState(false);
    const [paymentAttempt, setPaymentAttempt] = useState(false);

    return (
        <PaymentContext.Provider value={{ payment, setPayment, paymentAttempt, setPaymentAttempt }}>
            {children}
        </PaymentContext.Provider>
    );
}