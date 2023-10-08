import { View, Image, useWindowDimensions, Text, ActivityIndicator, Modal } from 'react-native'
import React, { useCallback, useContext, useRef, useState } from 'react'
import { themeConfig } from '../theme/ConfigurationTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { useNavigation } from '@react-navigation/native';
import { VisibilityScreen } from './VisibilityScreen'
import { ModalComponent, ModalRefProps } from '../components/ModalComponent'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const ConfigurationScreen = () => {
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
                <View style={{ alignSelf: 'center', flex: 5, width: '100%' }}>
                    <Text>Configuración</Text>
                    <ConfigurationItemComponent title={'Mi cuenta'} image={<Image source={require('../assets/icons/perfil.png')}
                        style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                    <ConfigurationItemComponent title={'Notificaciones'} image={<Image source={require('../assets/icons/campana.png')}
                        style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Notificaciones')} />
                    <ConfigurationItemComponent title={'Apariencia'} image={<Image source={require('../assets/icons/apariencia.png')}
                        style={{ width: width / 22, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={toggleModal} />
                    <ConfigurationItemComponent title={'Privacidad y Seguridad'} image={<Image source={require('../assets/icons/candado.png')}
                        style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                    <ConfigurationItemComponent title={'Ayuda y soporte'} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                        style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                    <ConfigurationItemComponent title={'Sobre Expoactiva Nacional App'} image={<Image source={require('../assets/icons/pregunta.png')}
                        style={{ width: width / 25, height: height / 40, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Sobre expoactiva')} />
                </View>
            </View>
        </GestureHandlerRootView>
    )
}


