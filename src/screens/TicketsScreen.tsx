import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { TicketComponent } from '../components/TicketComponent';
import { SeparatorComponent } from '../components/SeparatorComponent';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import QRCode from 'react-native-qrcode-svg';


export const TicketsScreen = () => {
    const { theme } = useContext(ThemeContext)
    const [number, setNumber] = useState(0)
    const navigation = useNavigation()
    const [chosenDate, setChosenDate] = useState(new Date());
    const { height, width } = useWindowDimensions()

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
        }
        ,
        {
            _id: 1,
            code: '123',
            deviceId: 1254,
            expireDate: new Date(Date.now()),
            in: true,

            qrCode: '12365',
            shared: false,
            state: true
        }
    ]


    return (
        <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>

            <View style={ticketStyles.topSide}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: height / 40, fontFamily: 'helvetica', fontWeight: 'bold', color: theme.colors.text }}>MIS ENTRADAS</Text>
                </View>

                <FlashList
                    estimatedItemSize={10}
                    data={ticket}
                    renderItem={({ item }: any) => <TicketComponent ticket={item} qrCode={'123'} method={() => navigation.navigate('TicketDetail')} />}
                    ItemSeparatorComponent={() => <SeparatorComponent />}
                />
            </View>

            <View style={{ ...ticketStyles.bottomSide }}>

                <View style={{ ...ticketStyles.topSideComplements, backgroundColor: theme.colors.background }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#608EDE'
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
        </View >
    )
}
