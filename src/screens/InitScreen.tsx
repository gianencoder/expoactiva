import React, { useCallback, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Button, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ModalComponent, ModalRefProps } from '../components/ModalComponent'
import { Text } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { MyColors } from '../theme/ColorsTheme'



export const InitScreen = ({ onAcceptTerms }) => {

    const [isChecked, setIsChecked] = useState(false)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);


    const accept = () => {
        setIsChecked(previousState => !previousState)
    }

    const handleContinue = () => {
        onAcceptTerms()
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider >
                <View style={styles.container}>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../assets/images/Expoactiva.jpg')}>
                        <View style={{ height: 'auto', width: '95%', backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 20, paddingTop: 30, paddingBottom: 10 }}>
                            <Image style={{ alignSelf: 'center', width: 150, height: 70 }} source={require('../assets/icons/privacy.png')} />
                            <View style={{ padding: 30, alignItems: 'center', gap: 50 }}>
                                <Text style={{ color: 'black', fontSize: 19 }}>
                                    Para utilizar la aplicación, debes aceptar los <Text onPress={handlePresentModalPress} style={styles.ref}>Términos y Condiciones de Uso</Text> y la <Text onPress={handlePresentModalPress} style={styles.ref}>Política de Privacidad</Text> establecidas por la organización.
                                </Text>

                                <View style={{ gap: 5, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text onPress={handlePresentModalPress} style={{ fontSize: 21 }}> Acepto Términos y Política</Text>
                                    <Checkbox
                                        style={{ borderRadius: 5 }}
                                        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                                        value={isChecked}
                                        onValueChange={accept}
                                        color={isChecked ? MyColors.primary : 'gray'}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity onPress={handleContinue}
                                disabled={!isChecked}
                                activeOpacity={0.8}
                                style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: '90%', height: 35, borderRadius: 10, backgroundColor: isChecked ? MyColors.primary : 'gray' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>Continuar</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>


                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        handleIndicatorStyle={{ width: 50 }}
                    >
                        <BottomSheetScrollView>
                            <View style={{ ...styles.contentContainer, zIndex: 1, gap: 5 }}>

                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Términos y Condiciones de Uso - Aplicación Móvil Expoactiva Nacional Uruguay</Text>
                                <Text style={{ fontSize: 16 }}>
                                    Bienvenido/a a la aplicación móvil de la Exposición en Soriano, organizada por la Asociación Rural de Soriano. Antes de utilizar esta aplicación, por favor, lea detenidamente los siguientes términos y condiciones. El acceso y uso de esta aplicación están sujetos a su aceptación y cumplimiento de estos términos.
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    1. Aceptación de Términos y Condiciones:
                                </Text>

                                <Text style={{ fontSize: 16 }}>
                                    Al utilizar esta aplicación, usted acepta expresamente estos términos y condiciones, así como nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, le recomendamos que no utilice la aplicación.
                                </Text>

                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    2. Geolocalización:
                                </Text>
                                <Text style={{ fontSize: 16 }}>
                                    La aplicación utiliza servicios de geolocalización para mejorar su experiencia durante la Exposición en Soriano. Al aceptar estos términos, usted autoriza a la aplicación a acceder a la información de geolocalización de su dispositivo móvil. La información de geolocalización se utiliza exclusivamente con fines relacionados con la Exposición y no será compartida con terceros.
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    3. Login y Datos del Usuario:
                                </Text>
                                <Text style={{ fontSize: 16 }}>
                                    Para acceder a ciertas funcionalidades de la aplicación, se le solicitará que inicie sesión con su dirección de correo electrónico o a través de su cuenta de Google. La información proporcionada durante el proceso de registro se manejará de acuerdo con nuestra Política de Privacidad.
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    4. Notificaciones:
                                </Text>
                                <Text style={{ fontSize: 16 }}>
                                    La aplicación enviará notificaciones relacionadas con eventos, actividades y actualizaciones de la Exposición. Estas notificaciones se basarán en las preferencias y eventos marcados como favoritos por el usuario. Usted puede gestionar las configuraciones de notificación desde la aplicación o la configuración del dispositivo.
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    5. Permiso de Acceso:
                                </Text>
                                <Text style={{ fontSize: 16 }}>
                                    Para el correcto funcionamiento de la aplicación, es necesario que otorgue permisos de acceso a la geolocalización y notificaciones. Asegúrese de que la aplicación tenga los permisos necesarios para brindarle la mejor experiencia posible.
                                </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    6. Uso de Datos y Privacidad:
                                </Text>

                                <Text style={{ fontSize: 16 }}>
                                    La información recopilada, incluyendo datos de geolocalización y datos de usuario, se utilizará exclusivamente para mejorar su experiencia en la Exposición. Respetamos su privacidad y nos comprometemos a proteger sus datos de acuerdo con nuestra Política de Privacidad.
                                </Text>

                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    7. Actualizaciones y Cambios:
                                </Text>


                                <Text style={{ fontSize: 16 }}>
                                    Nos reservamos el derecho de actualizar y cambiar estos términos en cualquier momento. Se le notificará sobre cambios significativos en la aplicación o en estos términos.
                                </Text>

                                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                    8. Condiciones Adicionales:
                                </Text>

                                <Text style={{ fontSize: 16 }}>
                                    Algunas funciones de la aplicación pueden estar sujetas a términos y condiciones adicionales. Al utilizar esas funciones específicas, usted acepta también esos términos adicionales.

                                    Al utilizar esta aplicación, usted reconoce haber leído, entendido y aceptado estos términos y condiciones. Si tiene alguna pregunta o inquietud, por favor, póngase en contacto con nosotros a través de los canales de soporte proporcionados en la aplicación.

                                    ¡Disfrute de la Exposición Expoactiva Nacional!

                                </Text>

                                <View style={{ top: 25, gap: 5 }}>


                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Política de Privacidad - Aplicación Móvil Expoactiva Nacional Uruguay</Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Bienvenido/a a la aplicación móvil de la Exposición en Soriano, organizada por la Asociación Rural de Soriano. Antes de utilizar esta aplicación, por favor, lea detenidamente los siguientes términos y condiciones. El acceso y uso de esta aplicación están sujetos a su aceptación y cumplimiento de estos términos.

                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                        1. Información Recopilada:
                                    </Text>

                                    <Text style={{ fontSize: 16 }}>
                                        Al utilizar esta aplicación, usted acepta expresamente estos términos y condiciones, así como nuestra Política de Privacidad. Si no está de acuerdo con alguno de estos términos, le recomendamos que no utilice la aplicación.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        2. Uso de la Información:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        La aplicación utiliza servicios de geolocalización para mejorar su experiencia durante la Exposición en Soriano. Al aceptar estos términos, usted autoriza a la aplicación a acceder a la información de geolocalización de su dispositivo móvil. La información de geolocalización se utiliza exclusivamente con fines relacionados con la Exposición y no será compartida con terceros.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        3. Permisos del Usuario:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Para acceder a ciertas funcionalidades de la aplicación, se le solicitará que inicie sesión con su dirección de correo electrónico o a través de su cuenta de Google. La información proporcionada durante el proceso de registro se manejará de acuerdo con nuestra Política de Privacidad.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        4. Seguridad de la Información:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        La aplicación enviará notificaciones relacionadas con eventos, actividades y actualizaciones de la Exposición. Estas notificaciones se basarán en las preferencias y eventos marcados como favoritos por el usuario. Usted puede gestionar las configuraciones de notificación desde la aplicación o la configuración del dispositivo.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        5. Compartir Información:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Para el correcto funcionamiento de la aplicación, es necesario que otorgue permisos de acceso a la geolocalización y notificaciones. Asegúrese de que la aplicación tenga los permisos necesarios para brindarle la mejor experiencia posible.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        6. Cambios en la Política de Privacidad:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        La información recopilada, incluyendo datos de geolocalización y datos de usuario, se utilizará exclusivamente para mejorar su experiencia en la Exposición. Respetamos su privacidad y nos comprometemos a proteger sus datos de acuerdo con nuestra Política de Privacidad.
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                        7. Contacto:
                                    </Text>
                                    <Text style={{ fontSize: 16 }}>
                                        Nos reservamos el derecho de actualizar y cambiar estos términos en cualquier momento. Se le notificará sobre cambios significativos en la aplicación o en estos términos.
                                    </Text>


                                    <Text style={{ fontSize: 16, alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>
                                        ¡Gracias por confiar en nosotros durante la Exposición Expoactiva Nacional!
                                    </Text>
                                </View>

                                <View style={{ height: 120 }}></View>

                            </View>
                        </BottomSheetScrollView>
                    </BottomSheetModal>

                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({

    ref: {
        color: '#205295'
        , fontWeight: 'bold'
        , textDecorationLine: 'underline'
    },
    container: {
        flex: 1,


    },
    contentContainer: {
        flex: 1,
        padding: 10,
        zIndex: 1,
    },
})
