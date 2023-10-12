import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';



export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>
            <View style={{ ...ticketStyles.qrCode, backgroundColor: theme.colors.background }}>

                <View style={{ ...ticketStyles.qrCard, backgroundColor: theme.colors.background }}>
                    <Image
                        source={require('../assets/images/codigo-qr.png')}
                        style={{ width: 150, height: 150, tintColor: theme.colors.text }}
                    />

                    <TouchableOpacity style={ticketStyles.button}>
                        <Text style={ticketStyles.buttonTxt}>Comprar ahora!</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ ...ticketStyles.buttonsContainer }}>
                <TextInput style={{ ...ticketStyles.inputText, borderBottomColor: theme.customColors.activeColor, color: theme.colors.text }} placeholderTextColor={theme.colors.text} placeholder='Ingresa tu código para canjear tu entrada'></TextInput>
                <TouchableOpacity style={ticketStyles.button}>
                    <Text style={ticketStyles.buttonTxt}>Canjear</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
