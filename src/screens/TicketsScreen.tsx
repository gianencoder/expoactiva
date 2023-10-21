import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions, DatePickerIOS } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
// import QRCode from 'react-native-qrcode-svg';





export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    const [number, setNumber] = useState(0)
    const navigation = useNavigation()
    const [chosenDate, setChosenDate] = useState(new Date());


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
        <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>
            <View style={{ ...ticketStyles.topSide }}>

                <View style={ticketStyles.topSideComplements}>
                    <DatePickerIOS date={chosenDate} onDateChange={setChosenDate} />
                </View>
                <View style={ticketStyles.topSideComplements}>
                    <Text>Cantidad</Text>
                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <Text>-</Text><Text>{number}</Text><Text>+</Text>
                    </View>
                </View>
                <View style={ticketStyles.topSideComplements}>
                    <TouchableOpacity style={{
                        backgroundColor: 'green'
                        , height: '50%'
                        , width: '90%'
                        , borderRadius: 10
                        , justifyContent: 'center'
                        , alignItems: 'center'
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>Comprar</Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={ticketStyles.bottomSide}>
                <FlashList
                    estimatedItemSize={10}
                    data={ticket}
                    renderItem={({ item }: any) => <TicketComponent ticket={item} qrCode={'123'} method={() => navigation.navigate('TicketDetail')} />}
                    ItemSeparatorComponent={() => <SeparatorComponent />}
                />
            </View>
        </View >
    )
}
