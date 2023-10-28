import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, useWindowDimensions, ScrollView } from 'react-native';
import { authStyle } from '../theme/AuthTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent';
import { ModalComponent, ModalRefProps } from '../components/ModalComponent';
import { AuthComponent } from '../components/AuthComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfileScreen } from './UserProfileScreen';
import { useAuthContext } from '../context/AuthContext/AuthContext';

export const AuthScreen = () => {
    const { width, height } = useWindowDimensions()
    const ref = useRef<ModalRefProps>(null)
    const { isLoggedIn } = useAuthContext()


    const toggleModal = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if (isActive) {
            ref?.current?.scrollTo(0)
        } else {
            ref?.current?.scrollTo(-height / 1.7)
        }

    }, [])


    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ flex: 1 }}>
            <ModalComponent ref={ref} children={
                <AuthComponent />
            } />

            {isLoggedIn
                ?
                <UserProfileScreen />
                :
                <View style={{ ...authStyle.authCard, backgroundColor: theme.colors.background }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, gap: 15 }}>
                        <Text style={{ ...authStyle.title, color: theme.colors.text }}>Perfil</Text>
                        <Text style={{ ...authStyle.subtitle, color: theme.customColors.subtitles }}>Inicia sesión para acceder a todas nuestras funcionalidades</Text>
                        <TouchableOpacity onPress={toggleModal} style={{
                            backgroundColor: theme.customColors.buttonColor, width: '100%', justifyContent: 'center', alignItems: 'center', height: 50,
                            borderRadius: 10

                        }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>Inicar sesión</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center' }}>
                            <Text style={{ color: 'grey', fontSize: 12, fontWeight: '500' }}>No tienes cuenta?</Text>
                            <TouchableOpacity onPress={toggleModal} >
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

                </View>
            }
        </View>


    )
}
