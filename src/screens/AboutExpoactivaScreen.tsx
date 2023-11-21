import React, { useContext } from 'react'
import { ImageBackground, ScrollView, Text } from 'react-native'
import { View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'

export const AboutExpoactivaScreen = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>

            <ImageBackground style={{ flex: 1 }} source={require('../assets/images/predio.expoactiva.jpg')}></ImageBackground>

            <ScrollView style={{ flex: 2, top: 30, }}>
                <View style={{ padding: 15 }}>


                    <Text style={{ color: theme.colors.text, fontSize: 20 }}>
                        Expoactiva Nacional es una iniciativa de la Asociación Rural de Soriano, asociación de productores rurales del departamento, con más de 120 años de trabajo en equipo.</Text>

                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 15 }}>
                        En el marco de los festejos de los 100 años,  en el año 1992, se organiza la 1era Expoactiva Nacional.  Se realiza en el mes de abril de aquel año, en el predio del establecimiento “Santa Amelia”  y se concreta como un evento de proyección  con el sello de la Asociación Rural de Soriano. En la misma ya se mostraban actividades prácticas de labores agrícolas lo que hoy le llamamos muestra activa.
                    </Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 30 }}>
                        Edición tras edición se fueron presentando los cambios de forma activa, cada evento tenía su proyección nacional y también regional, lo que hace que esta muestra tenga un concepto diferente;  recibir público del sector proveniente de toda la región.
                    </Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 45 }}>
                        En la actualidad está consolidada como la mayor muestra de agro negocios del país. Durante los cuatro días que dura el evento, participan más de 300 expositores y se presentan más de 750 marcas generando un impacto positivo en la región en áreas de conocimiento y tecnología.
                        Los avances del sector los podes ver en Expoactiva Nacional.
                    </Text>

                    <View style={{ height: 150 }}></View>
                </View>
            </ScrollView>

        </View >
    )
}
