import { View } from '@motify/components'
import React, { useEffect, useState } from 'react'
import { Image, Text } from 'react-native'
import { loadTranslations, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';

export const IconUserComponent = ({ color, txtSize, iconSize }: BottomTabIcons) => {
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Image style={{ width: iconSize, height: iconSize, tintColor: color }} source={require('../assets/icons/user.png')} />
            <Text style={{ color: color, fontSize: txtSize, fontWeight: '400' }}>{translation.bottomTab.configuracion}</Text>
        </View>
    )
}
