import { View, Image, useWindowDimensions, Text, Linking, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState, } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { VisibilityScreen } from './VisibilityScreen'
import { ModalComponent, ModalRefProps } from '../components/ModalComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'
import { ChangeLanguageScreen } from './ChangeLanguageScreen'
import { loadTranslations, translations } from '../util/utils'
import { useLanguage } from '../context/LanguageContext/LanguageContext'

interface Props extends StackScreenProps<any, any> { }
export const ConfigurationScreen = ({ navigation }: Props) => {
    const { theme } = useContext(ThemeContext)
    const { height } = useWindowDimensions()
    const ref = useRef<ModalRefProps>(null)
    const [selectedOption, setSelectedOption] = useState('');
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);


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
        loadTranslations(setTranslation);
    }, [languageState]);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ ...themeConfig.container, backgroundColor: theme.colors.background }}>
                <ModalComponent ref={ref} children={renderModalContent()} />
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flex: 1 }}><Text style={{ fontSize: 32, fontWeight: '300', color: theme.colors.text }}>{translation.configurationScreen.configuration}</Text></View>
                    <View style={{ flex: 5, gap: 20 }}>
                        <ConfigurationItemComponent title={translation.configurationScreen.myAccount} image={<Image source={require('../assets/icons/perfil.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AuthScreen2')} />
                        <ConfigurationItemComponent title={translation.configurationScreen.notifications} image={<Image source={require('../assets/icons/campana.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('NotificationScreen2')} />
                        <ConfigurationItemComponent title={translation.configurationScreen.appearance} image={<Image source={require('../assets/icons/apariencia.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => toggleModal('Apariencia')} />
                        <ConfigurationItemComponent title={translation.configurationScreen.changeLanguage} image={<Image source={require('../assets/icons/idioma.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => toggleModal('language')} />
                        <ConfigurationItemComponent title={translation.configurationScreen.privacyPolicy} image={<Image source={require('../assets/icons/cerrar.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('PrivacyPolicyScreen2')} />
                        <ConfigurationItemComponent title={translation.configurationScreen.helpAndSupport} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => support()} />
                        <ConfigurationItemComponent title={translation.configurationScreen.aboutApp} image={<Image source={require('../assets/icons/pregunta.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AboutExpoactivaScreen')} />
                    </View>
                </View>
            </View >
        </GestureHandlerRootView>

    )
}