import React from 'react';
import { Switch, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { visibilityTheme } from '../theme/VisibilityTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChangeLanguageScreen = () => {
    const { languageState, dispatchLanguage } = useLanguage();
    const { language } = languageState;

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
                label="Español"
                languageCode="es"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}
            />
            <SwitchOption
                label="English"
                languageCode="en"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}
            />
            <SwitchOption
                label="Português"
                languageCode="pt"
                selectedLanguage={language}
                onSwitchChange={handleSwitchChange}
            />
        </View>
    );
};

export const SwitchOption = ({ label, languageCode, selectedLanguage, onSwitchChange }) => {
    const isEnabled = selectedLanguage === languageCode;

    return (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={{ ...visibilityTheme.text, color: 'black' }}>{label}</Text>
            <Switch
                trackColor={{ false: 'grey', true: 'blue' }}
                thumbColor={'white'}
                ios_backgroundColor={'grey'}
                onValueChange={() => onSwitchChange(languageCode)}
                value={isEnabled}
            />
        </View>
    );
};

