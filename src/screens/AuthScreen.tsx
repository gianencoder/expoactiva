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

            {isLoggedIn
                ?
                <UserProfileScreen />
                :
                <>
                    <ModalComponent ref={ref} children={
                        <AuthComponent />
                    } />
                    <View style={{ ...authStyle.authCard, backgroundColor: theme.colors.background }}>
                        <View style={{ flex: 1, backgroundColor: 'transparent', padding: 10, gap: 20, paddingTop: 20 }}>
                            <Text style={{ ...authStyle.title, color: theme.colors.text }}>Mi cuenta</Text>
                            <Text style={{ ...authStyle.subtitle, color: theme.customColors.subtitles }}>
                                Inicia sesión para 
                                <Text style={{ fontWeight: '700' }}> listar</Text>, 
                                <Text style={{ fontWeight: '700' }}> comprar</Text> y 
                                <Text style={{ fontWeight: '700' }}> compartir</Text> tus entradas
                            </Text>

                            <TouchableOpacity onPress={toggleModal} style={{
                                backgroundColor: theme.customColors.buttonColor, width: '100%', justifyContent: 'center', alignItems: 'center', height: 50,
                                borderRadius: 10, marginTop: 40

                            }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Iniciar sesión</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', height: 50 }}>
                                <Text style={{ color: '#777777', fontSize: 14, fontWeight: '500' }}>¿No tienes cuenta?</Text>
                                <TouchableOpacity onPress={toggleModal} hitSlop={{ top: 30, bottom: 50, right: 30, left: 30 }} >
                                    <Text style={{ ...authStyle.createAccount, color: '#777777', }}>Presiona aquí</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </>
            }
        </View>


    )
}
