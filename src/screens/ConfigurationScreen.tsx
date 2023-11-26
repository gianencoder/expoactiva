import { View, Image, useWindowDimensions, Text, Linking, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState, } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { VisibilityScreen } from './VisibilityScreen'
import { ModalComponent, ModalRefProps } from '../components/ModalComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { ChangeLanguageScreen } from './ChangeLanguageScreen'
import { translate, translations } from '../util/utils'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Props extends StackScreenProps<any, any> { }
export const ConfigurationScreen = ({ navigation }: Props) => {
    const { theme } = useContext(ThemeContext)
    const { width, height } = useWindowDimensions()
    const ref = useRef<ModalRefProps>(null)
    const [selectedOption, setSelectedOption] = useState('');
    const { languageState } = useLanguage();
    const { language } = languageState;
    const [account, setAccount] = useState('');
    const [notifications, setNotifications] = useState('');
    const [appearance, setAppearance] = useState('');
    const [changeLanguage, setChangeLanguage] = useState('');
    const [privacyPolicy, setPrivacyPolicy] = useState('');
    const [helpAndSupport, setHelpAndSupport] = useState('');
    const [aboutApp, setAboutApp] = useState('');


    const [loading, setLoading] = useState(true);


    const toggleModal = useCallback((option) => {
        setSelectedOption(option);
        const isActive = ref?.current?.isActive();
        if (isActive) {
            ref?.current?.scrollTo(0);
        } else {
            ref?.current?.scrollTo(-height / 2.5);
        }
    }, [height, ref]);

    const renderModalContent = () => {
        switch (selectedOption) {
            case 'Apariencia':
                return <VisibilityScreen />;
            case 'language':
                return <ChangeLanguageScreen />
            default:
                return null;
        }
    };

    function support() {
        return Linking.openURL('mailto:soporte@expoactiva.com').catch(err => {
            Alert.alert('No se ha podido procesar tu solicitud',
                "Intenta nuevamente en unos minutos",
                [{ text: "Ok" }])
        })
    }





    useEffect(() => {
        const translateTexts = async () => {
            try {
                // Verificar si el idioma ya está en español
                const currentLanguage = await AsyncStorage.getItem('language');
                if (currentLanguage !== 'es') {
                    // Si no está en español, realizar traducciones
                    const accounTranslate = await translate(translations.configurationScreen.myAccount, language);
                    const notificationsTranslate = await translate(translations.configurationScreen.notifications, language);
                    const appearanceTranslate = await translate(translations.configurationScreen.appearance, language);
                    const changeLanguageTranslate = await translate(translations.configurationScreen.changeLanguage, language);
                    const privacyPolicyTranslate = await translate(translations.configurationScreen.privacyPolicy, language);
                    const helpAndSupportTranslate = await translate(translations.configurationScreen.helpAndSupport, language);
                    const aboutAppTranslate = await translate(translations.configurationScreen.aboutApp, language);

                    setAccount(accounTranslate);
                    setNotifications(notificationsTranslate);
                    setAppearance(appearanceTranslate);
                    setChangeLanguage(changeLanguageTranslate);
                    setPrivacyPolicy(privacyPolicyTranslate);
                    setHelpAndSupport(helpAndSupportTranslate);
                    setAboutApp(aboutAppTranslate);
                } else {
                    setAccount(translations.configurationScreen.myAccount);
                    setNotifications(translations.configurationScreen.notifications);
                    setAppearance(translations.configurationScreen.appearance);
                    setChangeLanguage(translations.configurationScreen.changeLanguage);
                    setPrivacyPolicy(translations.configurationScreen.privacyPolicy);
                    setHelpAndSupport(translations.configurationScreen.helpAndSupport);
                    setAboutApp(translations.configurationScreen.aboutApp);
                }
            } catch (error) {
                console.log('Error en la traducción o al obtener el idioma:', error);
            } finally {
                setLoading(false);
            }
        };

        translateTexts();
    }, [languageState]);

    if (loading) {
        // Puedes renderizar un componente de carga mientras se realizan las traducciones
        return <ActivityIndicator
            style={{ width: '100%', height: '100%', backgroundColor: theme.colors.background }}
            color={theme.customColors.activeColor}
            size={'large'} />;
    }



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ ...themeConfig.container, backgroundColor: theme.colors.background }}>
                <ModalComponent ref={ref} children={renderModalContent()} />
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flex: 1 }}><Text style={{ fontSize: 32, fontWeight: '300', color: theme.colors.text }}>Configuración</Text></View>
                    <View style={{ flex: 5, gap: 20 }}>
                        <ConfigurationItemComponent title={account} image={<Image source={require('../assets/icons/perfil.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AuthScreen2')} />
                        <ConfigurationItemComponent title={notifications} image={<Image source={require('../assets/icons/campana.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('NotificationScreen2')} />
                        <ConfigurationItemComponent title={appearance} image={<Image source={require('../assets/icons/apariencia.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => toggleModal('Apariencia')} />
                        <ConfigurationItemComponent title={changeLanguage} image={<Image source={require('../assets/icons/idioma.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => toggleModal('language')} />
                        <ConfigurationItemComponent title={privacyPolicy} image={<Image source={require('../assets/icons/cerrar.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('PrivacyPolicyScreen2')} />
                        <ConfigurationItemComponent title={helpAndSupport} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => support()} />
                        <ConfigurationItemComponent title={aboutApp} image={<Image source={require('../assets/icons/pregunta.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AboutExpoactivaScreen')} />
                    </View>
                </View>
            </View >
        </GestureHandlerRootView>

    )
}