import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text } from 'react-native';
import { View } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { loadTranslations, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';



export const AboutExpoactivaScreen = () => {
    const { languageState } = useLanguage();
    const { theme } = useContext(ThemeContext);
    const [translation, setTranslation] = useState(translations.es);


    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ImageBackground style={{ flex: 1 }} source={require('../assets/images/predio.expoactiva.jpg')}></ImageBackground>

            <ScrollView style={{ flex: 2, top: 30 }}>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 20 }}>{translation.aboutExpoactivaScreen.text1}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 15 }}>{translation.aboutExpoactivaScreen.text2}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 30 }}>{translation.aboutExpoactivaScreen.text3}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 45 }}>{translation.aboutExpoactivaScreen.text4}</Text>

                    <View style={{ height: 150 }}></View>
                </View>
            </ScrollView>
        </View>
    );
};
