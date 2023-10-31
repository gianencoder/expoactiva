import React, { useContext } from 'react'
import { View } from '@motify/components'
import { Text, TouchableOpacity, Linking } from 'react-native'
import { notiTheme } from '../theme/NotificationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const NotificationScreen = () => {

    const { theme } = useContext(ThemeContext)


    return (
        <View style={{ ...notiTheme.container, backgroundColor: theme.colors.background }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.colors.text }}>Habilitar las notificaciones push</Text>
            <Text style={{ textAlign: 'center', color: 'gray', width: '90%' }}>Las notificaciones push se encuentran inhabilitadas. Para habilitarlas dirigete a los permisos de la aplicacion en la configuracion personal de tu telefono.</Text>

            <TouchableOpacity
                onPress={() => Linking.openSettings()}
                style={{
                    backgroundColor: theme.customColors.buttonColor
                    , width: '40%'
                    , alignItems: 'center'
                    , justifyContent: 'center'
                    , height: 35
                    , borderRadius: 8
                }}>
                <Text style={{ color: 'white' }} >Abrir configuracion</Text>
            </TouchableOpacity>

        </View >
    )
}
