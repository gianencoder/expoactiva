import React, { useContext, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { privacyTheme } from '../theme/PrivacyPolicyTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { Text } from 'react-native'
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native'

export const PrivacyPolicyScreen = () => {

    const [isChecked, setIsChecked] = useState(false)
    const navigation = useNavigation()

    const accept = () => {
        setIsChecked(previousState => !previousState)
    }

    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    return (
        <View style={{ ...privacyTheme.container, backgroundColor: colors.background }}>

            <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
                <View style={{ flex: 3, gap: 15 }}>
                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Política de Privacidad de Cyb3rSoft para Expoactiva Nacional
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Bienvenido a Expoactiva Nacional, un evento
                        organizado por la Asociación Rural de Soriano.
                        A continuación, detallamos nuestra política de privacidad específica para este evento,
                        para que comprendas cómo manejamos la información recopilada durante tu participación en Expoactiva Nacional.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Información Recopilada durante Expoactiva Nacional
                    </Text>

                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        1. Coordenadas de Ubicación
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Durante Expoactiva Nacional,
                        Cyb3rSoft, equipo desarrollador de la aplicación, puede recopilar tus coordenadas de ubicación únicamente cuando hayas otorgado permiso explícito para acceder a tu GPS.
                        Esta información se utilizará para proporcionarte servicios y contenido personalizado relacionado con Expoactiva Nacional,
                        y no se asociará con datos que identifiquen personalmente a un individuo.
                    </Text>


                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        2. Información del Evento
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Cyb3rSoft puede recopilar información relacionada con tus interacciones dentro de Expoactiva Nacional,
                        como los stands que visitas, las actividades en las que participas y los horarios que seleccionas.
                        Esta información se utiliza para mejorar tu experiencia en el evento y personalizar recomendaciones.
                    </Text>

                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        3. Intereses y Edad
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Con el fin de ofrecerte una experiencia más personalizada durante Expoactiva Nacional,
                        Cyb3rSoft puede recopilar información sobre tus intereses y edad.
                        Estos datos se utilizan exclusivamente para adaptar las recomendaciones y el contenido del evento.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Uso de la Información
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        La información recopilada durante Expoactiva Nacional se utiliza para mejorar y personalizar tu experiencia en el evento.
                        Cyb3rSoft se compromete a no compartir,
                        vender ni divulgar tus datos personales a terceros de manera que te identifique de manera individual.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Cumplimiento con las Leyes de Protección de Datos
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Cyb3rSoft garantiza el cumplimiento con las leyes vigentes de protección de datos personales en Uruguay, especialmente durante la participación en Expoactiva Nacional.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Derecho de Rechazo
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Si no estás de acuerdo con nuestra política de privacidad específica para Expoactiva Nacional,
                        te recomendamos que no utilices la aplicación durante el evento. Al no aceptar nuestras políticas,
                        es posible que algunas funcionalidades personalizadas no estén disponibles.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Cambios en la Política de Privacidad
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Nos reservamos el derecho de modificar esta política en cualquier momento. Las actualizaciones se comunicarán a través de la aplicación.
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        Contacto
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad para Expoactiva Nacional, no dudes en ponerte en contacto con nosotros a través de cybersoft@hotmail.com.
                        Gracias por ser parte de Expoactiva Nacional y confiar en Cyb3rSoft para mejorar tu experiencia en el evento mientras protegemos tu privacidad. ¡Disfruta del evento!
                    </Text>



                </View>
            </ScrollView>
            <View style={{ flex: 0.2, gap: 40, padding: 10 }}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Text style={{ ...privacyTheme.text, color: colors.text, fontWeight: 'bold', fontSize: 20 }}>Acepto las Políticas de privacidad</Text>
                    <Checkbox
                        style={{ borderRadius: 10 }}
                        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                        value={isChecked}
                        onValueChange={accept}
                        color={isChecked ? customColors.activeColor : 'gray'}
                    />
                </View>

                <View style={{ flexDirection: 'row', flex: 0.2, gap: 10 }}>
                    <TouchableOpacity style={{ ...privacyTheme.btn, backgroundColor: customColors.bgErrorMessage }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Salir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                        disabled={!isChecked}
                        style={{ ...privacyTheme.btn, backgroundColor: isChecked ? customColors.buttonColor : 'gray' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Aceptar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}
