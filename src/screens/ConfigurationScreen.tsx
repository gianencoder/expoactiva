import { View, Image, useWindowDimensions, Text } from 'react-native'
import React, { useCallback, useContext, useRef, } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { useNavigation } from '@react-navigation/native';
import { VisibilityScreen } from './VisibilityScreen'
import { ModalComponent, ModalRefProps } from '../components/ModalComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<any, any> { }
export const ConfigurationScreen = ({ navigation }: Props) => {
    const { theme } = useContext(ThemeContext)
    const { width, height } = useWindowDimensions()
    const ref = useRef<ModalRefProps>(null)


    const toggleModal = useCallback(() => {
        const isActive = ref?.current?.isActive()
        if (isActive) {
            ref?.current?.scrollTo(0)
        } else {
            ref?.current?.scrollTo(-height / 2.5)
        }

    }, [])


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ ...themeConfig.container, backgroundColor: theme.colors.background }}>
                <ModalComponent ref={ref} children={<VisibilityScreen />} />
                <View style={{ flex: 1, padding: 20 }}>
                    <View style={{ flex: 1 }}><Text style={{ fontSize: 30, fontWeight: '400', color: theme.colors.text }}>Configuración</Text></View>
                    <View style={{ flex: 5, gap: 20 }}>
                        <ConfigurationItemComponent title={'Mi cuenta'} image={<Image source={require('../assets/icons/perfil.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AuthScreen2')} />
                        <ConfigurationItemComponent title={'Notificaciones'} image={<Image source={require('../assets/icons/campana.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('NotificationScreen2')} />
                        <ConfigurationItemComponent title={'Apariencia'} image={<Image source={require('../assets/icons/apariencia.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={toggleModal} />
                        <ConfigurationItemComponent title={'Privacidad y Seguridad'} image={<Image source={require('../assets/icons/cerrar.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                        <ConfigurationItemComponent title={'Ayuda y soporte'} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                        <ConfigurationItemComponent title={'Sobre Expoactiva Nacional App'} image={<Image source={require('../assets/icons/pregunta.png')}
                            style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Sobre expoactiva')} />
                    </View>
                </View>
            </View >
        </GestureHandlerRootView>

    )
}