import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';



export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    return (
        <View style={ticketStyles.container}>
            <View style={{ ...ticketStyles.qrCode, paddingTop: height < 700 ? '20%' : '0%' }}>
                <Image source={require('../assets/icons/qr.png')}></Image>
            </View>
            <Text>Que esperas para comprar tu entrada?</Text>
            <View style={ticketStyles.buttonsContainer}>
                <TouchableOpacity style={{ ...ticketStyles.button, top: '-10%' }}>
                    <Text style={ticketStyles.buttonTxt}>COMPRAR</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={ticketStyles.inputText} placeholder='Ingresa tu código para canjear tu entrada'></TextInput>
            <View style={ticketStyles.buttonsContainer}>
                <TouchableOpacity style={ticketStyles.button}>
                    <Text style={ticketStyles.buttonTxt}>Canjear</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
