import React, { useContext, useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { visibilityTheme } from '../theme/VisibilityTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { loadTranslations, translations } from '../util/utils';

export const ChangeLanguageScreen = () => {
    const { languageState, dispatchLanguage } = useLanguage();
    const { language } = languageState;
    const [translation, setTranslation] = useState(translations.es);

    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    const handleSwitchChange = (selectedLanguage: string) => {
        console.log(selectedLanguage)
        dispatchLanguage({ type: 'set_language', payload: selectedLanguage });
        AsyncStorage.setItem('language', selectedLanguage)
            .then(() => console.log('Language saved successfully:', selectedLanguage))
            .catch(error => console.error('Error saving language to AsyncStorage:', error));
    };

    return (
        <View style={{ flex: 1, paddingVertical: 5, gap: 5 }}>
            <SwitchOption
                label={translation.changeLanguage.español}
                languageCode="es"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}

            />
            <SwitchOption
                label={translation.changeLanguage.ingles}
                languageCode="en"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}
            />
            <SwitchOption
                label={translation.changeLanguage.portugues}
                languageCode="pt"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}
            />
        </View>
    );
};

export const SwitchOption = ({ label, languageCode, selectedLanguage, onSwitchChange }) => {
    const isEnabled = selectedLanguage === languageCode;
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ ...visibilityTheme.text, color: theme.colors.text }}>{label}</Text>
            <Switch
                trackColor={{ false: 'grey', true: theme.customColors.activeColor }}
                thumbColor={'white'}
                ios_backgroundColor={'grey'}
                onValueChange={() => onSwitchChange(languageCode)}
                value={isEnabled}
            />
        </View>
    );
};

