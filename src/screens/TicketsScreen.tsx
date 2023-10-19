import { View, Text, TouchableOpacity, Image, TextInput, useWindowDimensions } from 'react-native';
import { ticketStyles } from '../theme/TicketsTheme';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const TicketsScreen = () => {
    const { height } = useWindowDimensions()
    const { theme } = useContext(ThemeContext)

    const [name, setName] = useState("")

    const handleChargeName = async () => {

        await AsyncStorage.setItem('name', JSON.stringify(name)).then(name => {
            console.log("Saved")
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        const getName = async () => {
            const getName = await AsyncStorage.getItem('name');
            if (getName) {
                setName(JSON.stringify(getName))
            } else {
                setName(" ")
            }

        }

        getName()
    }, [])



    return (
        <View style={{ ...ticketStyles.container, backgroundColor: theme.colors.background }}>
            <View style={{ ...ticketStyles.qrCode, backgroundColor: theme.colors.background }}>

                <View style={{ ...ticketStyles.qrCard, backgroundColor: theme.colors.background }}>
                    <Image
                        source={require('../assets/images/codigo-qr.png')}
                        style={{ width: 150, height: 150, tintColor: theme.colors.text }}
                    />

                    <TouchableOpacity onPress={handleChargeName} style={ticketStyles.button}>
                        <Text style={ticketStyles.buttonTxt}>{name}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ ...ticketStyles.buttonsContainer }}>
                <TextInput value={name} onChangeText={name => setName(name)} style={{ ...ticketStyles.inputText, borderBottomColor: theme.customColors.activeColor, color: theme.colors.text }} placeholderTextColor={theme.colors.text} placeholder='Ingresa tu código para canjear tu entrada'></TextInput>
                <TouchableOpacity style={ticketStyles.button}>
                    <Text style={ticketStyles.buttonTxt}>Canjear</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
