import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import QRCodeStyled from 'react-native-qrcode-styled';





export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)


    const ticket: Ticket[] = [
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },

        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        },

    ]



    return (
        <View style={{ ...ticketStyles.container }}>

            <View style={{ flex: 1, backgroundColor: 'white' }}>

            </View>


            <View style={ticketStyles.bottomSide}>
                {/* <FlashList
                    estimatedItemSize={10}
                    data={ticket}
                    renderItem={({ item }: any) => <TicketComponent ticket={item} qrCode={'123'} />}
                    ItemSeparatorComponent={() => <SeparatorComponent />}

                /> */}

                <QRCodeStyled
                    data={'Simple QR Code'}
                    style={{ backgroundColor: 'white' }}
                    padding={20}
                    pieceSize={8}
                />
            </View>
        </View >
    )
}
