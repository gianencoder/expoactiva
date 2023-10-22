import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"

export const TicketFunction = () => {
    const [total, setTotal] = useState(0)
    const navigation = useNavigation()
    const ticket: Ticket[] = [

        {
            _id: 1,
            code: '',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,
            qrCode: 'https://youtube.com',
            shared: false,
            state: true
        },
        {
            _id: 2,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: 'https://google.com',
            shared: false,
            state: true
        },
        {
            _id: 3,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: 'https://facebook.com',
            shared: false,
            state: true
        }

    ]

    const ticketDetail = (id: number) => {
        try {
            const selectedTicket = ticket.find(ex => ex._id === id)
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

    const operations = (code: number) => {
        if (code == 0 && total < 6) {
            setTotal(previousNumber => previousNumber + 1)
        }

        if (code === 1 && total > 0) {
            setTotal(previousNumber => previousNumber - 1)
        }
    }

    return ({
        ticket
        , ticketDetail
        , total
        , operations
    })
}




