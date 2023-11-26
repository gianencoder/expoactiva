import React, { useContext, useState, useEffect } from 'react'
import { View } from '@motify/components'
import { Text, TouchableOpacity, Linking, Platform, AppState } from 'react-native'
import { notiTheme } from '../theme/NotificationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { usePushNotifications } from '../hooks/usePushNotifications';
import { useNavigation } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const NotificationScreen = () => {

    const { verifyPermissions } = usePushNotifications();
    const [granted, setGranted] = useState(false)
    const navigation = useNavigation();
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    useEffect(() => {
        verifyPermissions().then(res => setGranted(res))
    }, [])

    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (Platform.OS !== 'android') {
            const handleAppStateChange = async () => {
                const res = await verifyPermissions();
                setGranted(res);
                navigation.goBack()
            };

            const subscription = AppState.addEventListener("change", handleAppStateChange);

            return () => {
                subscription.remove();
            };
        }
    }, [granted]);

    return (
        <View style={{ ...notiTheme.container, backgroundColor: theme.colors.background }}>
            {granted ? (
                <>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text, marginBottom: 5 }}>{translation.notificationScreen.desactivarNotificaciones}</Text>
                    <Text style={{ textAlign: 'center', color: 'gray', width: '90%', fontSize: 17 }}>{translation.notificationScreen.textoNotificacionesActivadas}</Text>
                </>
            ) : (
                <>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: theme.colors.text, marginBottom: 5 }}>{translation.notificationScreen.activarNotificaciones}</Text>
                    <Text style={{ textAlign: 'center', color: 'gray', width: '95%', fontSize: 17 }}>{translation.notificationScreen.textoNotificacionesDesactivadas}</Text>
                </>
            )}
            <TouchableOpacity
                onPress={() => Linking.openSettings()}
                style={{
                    backgroundColor: theme.customColors.buttonColor
                    , width: '50%'
                    , alignItems: 'center'
                    , justifyContent: 'center'
                    , height: 45
                    , borderRadius: 8
                }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }} >{translation.notificationScreen.botonAbrirConfiguracion}</Text>
            </TouchableOpacity>

        </View >
    )
}
