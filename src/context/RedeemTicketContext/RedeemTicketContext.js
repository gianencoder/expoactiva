import React, { createContext, useState, useContext } from 'react';

export const RedeemTicketContext = createContext();

export const useRedeemTicket = () => useContext(RedeemTicketContext);

export const RedeemTicketProvider = ({ children }) => {
    const [claimedTicket, setClaimedTicket] = useState(false);
    const [redeemTicketAttempt, setRedeemTicketAttempt] = useState(false);

    return (
        <RedeemTicketContext.Provider value={{ claimedTicket, setClaimedTicket, redeemTicketAttempt, setRedeemTicketAttempt }}>
            {children}
        </RedeemTicketContext.Provider>
    );
}