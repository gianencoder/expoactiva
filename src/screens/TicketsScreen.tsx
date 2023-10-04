import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';



export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    return (
        <View style={ticketStyles.container}>
            <View style={ticketStyles.qrCode}>

                <View style={ticketStyles.qrCard}>
                    <Image
                        source={require('../assets/images/codigo-qr.png')}
                        style={{ width: 150, height: 150 }}
                    />

                    <TouchableOpacity style={ticketStyles.button}>
                        <Text style={ticketStyles.buttonTxt}>Comprar ahora!</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <View style={ticketStyles.buttonsContainer}>
                <TextInput style={ticketStyles.inputText} placeholder='Ingresa tu código para canjear tu entrada'></TextInput>
                <TouchableOpacity style={ticketStyles.button}>
                    <Text style={ticketStyles.buttonTxt}>Canjear</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
