import React, { useCallback, useContext, useRef, useState } from 'react'
import { View, Image, useWindowDimensions, Text } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { VisibilityScreen } from './VisibilityScreen'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { NavigationHook } from '../hooks/NavigationHook';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { CustomHandleComponent } from '../components/CustomHandleComponent'
import { CustomBackgroundComponent } from '../components/CustomBackgroundComponent'



export const ConfigurationScreen = () => {

    const sheetRef = useRef<BottomSheet>(null)
    const [isOpen, setIsOpen] = useState(true)
    const { theme } = useContext(ThemeContext)
    const { navigation } = NavigationHook()

    const handleShowModal = () => {
        if (!isOpen) {
            sheetRef.current?.expand();
            setIsOpen(true);
        } else {
            sheetRef.current?.close();
            setIsOpen(false);
        }
    };
    const snapPoints = ['20%']
    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 40, color: theme.colors.text }}>Configuración</Text>
                </View>

                <View style={{ flex: 4, gap: 20, }}>
                    <ConfigurationItemComponent title={'Mi cuenta'} image={<Image source={require('../assets/icons/perfil.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => navigation.navigate('AuthScreen')} />
                    <ConfigurationItemComponent title={'Notificaciones'} image={<Image source={require('../assets/icons/campana.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Notificaciones')} />
                    <ConfigurationItemComponent title={'Apariencia'} image={<Image source={require('../assets/icons/apariencia.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => handleShowModal()} />
                    <ConfigurationItemComponent title={'Privacidad y Seguridad'} image={<Image source={require('../assets/icons/cerrar.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                    <ConfigurationItemComponent title={'Ayuda y soporte'} image={<Image source={require('../assets/icons/ayuda-soporte.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Mi cuenta')} />
                    <ConfigurationItemComponent title={'Sobre Expoactiva Nacional App'} image={<Image source={require('../assets/icons/pregunta.png')}
                        style={{ width: 18, height: 18, tintColor: theme.customColors.iconColor }} />} method={() => console.log('Sobre expoactiva')} />
                </View>

                <BottomSheet
                    index={-1}
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose
                    handleComponent={CustomHandleComponent}
                    backgroundComponent={CustomBackgroundComponent}
                    onClose={() => setIsOpen(false)}
                >
                    <BottomSheetView style={{ flex: 1, backgroundColor: theme.colors.background, borderRadius: 30 }}>
                        <VisibilityScreen />
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>

    )
}
