import React, { useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { authStyle } from '../theme/AuthTheme'
import { useNavigation } from '@react-navigation/native'

export const ReedemTicketScreen = () => {
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const navigation = useNavigation()

    return (

        <View style={{ ...ticketStyles.container2, backgroundColor: colors.background }}>

            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 25 }}>Canjea tu entrada</Text>
            </View>

            <View style={editProfileTheme.div}>
                <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>Código</Text>
                <TextInput
                    clearButtonMode='while-editing'
                    maxLength={50}
                    keyboardType='default'
                    // value={name}
                    // onChangeText={text => setName(text)}
                    style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                    placeholder='Tu código aquí...' placeholderTextColor={'gray'} />
            </View>
            <TouchableOpacity
                // onPress={() => navigation.navigate('BuyTicket')}
                style={{
                    backgroundColor: '#F05941'
                    , height: 40
                    , width: '90%'
                    , borderRadius: 10
                    , justifyContent: 'center'
                    , alignItems: 'center'
                    , alignSelf: 'center'
                }}>
                <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>CANJEAR</Text>
            </TouchableOpacity>

            <Text onPress={() => navigation.navigate('TicketsScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
        </View>

    )
}
