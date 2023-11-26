import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, useWindowDimensions, ScrollView, ActivityIndicator } from 'react-native';
import { authStyle } from '../theme/AuthTheme';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent';
import { ModalComponent, ModalRefProps } from '../components/ModalComponent';
import { AuthComponent } from '../components/AuthComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfileScreen } from './UserProfileScreen';
import { useAuthContext } from '../context/AuthContext/AuthContext';
import { loadTranslations, translate, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';

export const AuthScreen = () => {
    const { width, height } = useWindowDimensions()
    const ref = useRef<ModalRefProps>(null)
    const { isLoggedIn } = useAuthContext()
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);


    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);



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
                            <Text style={{ ...authStyle.title, color: theme.colors.text }}>{translation.authScreen.accountTitle}</Text>
                            <Text style={{ ...authStyle.subtitle, color: theme.customColors.subtitles }}>
                                Inicia sesión para
                                <Text style={{ fontWeight: '700' }}> {translation.authScreen.listar}</Text>,
                                <Text style={{ fontWeight: '700' }}> {translation.authScreen.comprar}</Text> y
                                <Text style={{ fontWeight: '700' }}> {translation.authScreen.compartir}</Text> tus entradas
                            </Text>

                            <TouchableOpacity onPress={toggleModal} style={{
                                backgroundColor: theme.customColors.buttonColor, width: '100%', justifyContent: 'center', alignItems: 'center', height: 50,
                                borderRadius: 10, marginTop: 40

                            }}>
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>{translation.authScreen.loginButton}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', height: 50 }}>
                                <Text style={{ color: '#777777', fontSize: 14, fontWeight: '500' }}>{translation.authScreen.noAccountText}</Text>
                                <TouchableOpacity onPress={toggleModal} hitSlop={{ top: 30, bottom: 50, right: 30, left: 30 }} >
                                    <Text style={{ ...authStyle.createAccount, color: '#777777', }}>{translation.authScreen.createAccount}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </>
            }
        </View>


    )
}
