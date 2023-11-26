import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text } from 'react-native';
import { View } from 'react-native';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { translate, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AboutExpoactivaScreen = () => {
    const { languageState } = useLanguage();
    const { language } = languageState;


    const { theme } = useContext(ThemeContext);
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const translateTexts = async () => {
            try {
                const currentLanguage = await AsyncStorage.getItem('language');
                if (currentLanguage !== 'es') {
                    const translatedText1 = await translate(translations.aboutExpoactivaScreen.text1, language);
                    const translatedText2 = await translate(translations.aboutExpoactivaScreen.text2, language);
                    const translatedText3 = await translate(translations.aboutExpoactivaScreen.text3, language);
                    const translatedText4 = await translate(translations.aboutExpoactivaScreen.text4, language);

                    setText1(translatedText1);
                    setText2(translatedText2);
                    setText3(translatedText3);
                    setText4(translatedText4);
                } else {
                    setText1(translations.aboutExpoactivaScreen.text1);
                    setText2(translations.aboutExpoactivaScreen.text2);
                    setText3(translations.aboutExpoactivaScreen.text3);
                    setText4(translations.aboutExpoactivaScreen.text4);
                }
            } catch (error) {
                console.log('Error en la traducción:', error);
            } finally {
                setLoading(false)
            }
        };

        translateTexts();
    }, []);

    if (loading) {
        // Puedes renderizar un componente de carga mientras se realizan las traducciones
        return <ActivityIndicator
            style={{ width: '100%', height: '100%', backgroundColor: theme.colors.background }}
            color={theme.customColors.activeColor}
            size={'large'} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <ImageBackground style={{ flex: 1 }} source={require('../assets/images/predio.expoactiva.jpg')}></ImageBackground>

            <ScrollView style={{ flex: 2, top: 30 }}>
                <View style={{ padding: 15 }}>
                    <Text style={{ color: theme.colors.text, fontSize: 20 }}>{text1}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 15 }}>{text2}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 30 }}>{text3}</Text>
                    <Text style={{ color: theme.colors.text, fontSize: 20, top: 45 }}>{text4}</Text>

                    <View style={{ height: 150 }}></View>
                </View>
            </ScrollView>
        </View>
    );
};
