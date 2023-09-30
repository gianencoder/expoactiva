import { View, Image, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { useNavigation } from '@react-navigation/native';



export const ConfigurationScreen = () => {

    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions()

    return (
        <View style={{ ...themeConfig.container, backgroundColor: theme.colors.background }}>
            <View style={{ flex: .3 }}>
            </View>
            <View style={{ flex: 5 }}>
                <ConfigurationItemComponent title={'Mi cuenta'} image={<Image source={require('../assets/icons/usuarios.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => console.log('Mi cuenta')} />
                <ConfigurationItemComponent title={'Notificaciones'} image={<Image source={require('../assets/icons/campana.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => console.log('Notificaciones')} />
                <ConfigurationItemComponent title={'Apariencia'} image={<Image source={require('../assets/icons/apariencia.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => navigation.navigate('ProfileScreen')} />
                <ConfigurationItemComponent title={'Privacidad y Seguridad'} image={<Image source={require('../assets/icons/candado.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => console.log('Mi cuenta')} />
                <ConfigurationItemComponent title={'Ayuda y soporte'} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => console.log('Mi cuenta')} />
                <ConfigurationItemComponent title={'Sobre Expoactiva Nacional App'} image={<Image source={require('../assets/icons/pregunta.png')}
                    style={{ width: width / 25, height: height / 45, tintColor: 'black' }} />} method={() => console.log('Sobre expoactiva')} />
            </View>

        </View>
    )
}


