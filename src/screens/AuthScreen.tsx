import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { authStyle } from '../theme/AuthTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent';

export const AuthScreen = () => {
    const { width, height } = useWindowDimensions()

    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...authStyle.authCard, backgroundColor: theme.colors.background }}>

            {/* SE USAR PARA GENERAR ESPACIO NADA MAS NO BORRAR */}
            {height > 680 && <View style={{ flex: .2 }}></View>}

            <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, gap: 15 }}>
                <Text style={{ ...authStyle.title, color: theme.colors.text }}>Perfil</Text>
                <Text style={{ ...authStyle.subtitle, color: theme.customColors.subtitles }}>Inicia sesión para comenzar a disfrutar tu estadia</Text>
                <TouchableOpacity style={{
                    backgroundColor: theme.colors.primary, width: '100%', justifyContent: 'center', alignItems: 'center', height: 50,
                    borderRadius: 10

                }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Inicar sesión</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                    <Text style={{ color: 'grey', fontSize: 12, fontWeight: '500' }}>No tienes cuenta?</Text>
                    <TouchableOpacity>
                        <Text style={{ ...authStyle.createAccount, color: theme.colors.text, }}>Create una</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ ...authStyle.bottomScreen }}>
                <ConfigurationItemComponent title={'Privacidad y Seguridad'} image={<Image source={require('../assets/icons/candado.png')}
                    style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                <ConfigurationItemComponent title={'Ayuda y soporte'} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                    style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                <ConfigurationItemComponent title={'Sobre Expoactiva Nacional App'} image={<Image source={require('../assets/icons/pregunta.png')}
                    style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Sobre expoactiva')} />
            </View>

            {/* SE USAR PARA GENERAR ESPACIO NADA MAS NO BORRAR */}
            {height > 680 && <View style={{ flex: .5 }}></View>}

        </View>


    )
}
