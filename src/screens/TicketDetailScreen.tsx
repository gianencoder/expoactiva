import React, { useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import QRCode from "react-native-qrcode-svg";
import { useRoute } from '@react-navigation/native';
import { useLanguage } from '../context/LanguageContext/LanguageContext';
import { loadTranslations, translations } from '../util/utils';

export const TicketDetail = () => {

    const { theme } = useContext(ThemeContext)
    const route = useRoute()
    const { qrCode }: any = route.params
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>

            <View style={{
                height: 500, width: '90%'
                , justifyContent: 'center'
                , alignItems: 'center'
                , backgroundColor: theme.colors.background
                , borderRadius: 15
                , shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.4,
                shadowRadius: 16.00,

                elevation: 18,
            }}>
                {qrCode !== undefined

                    ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', paddingHorizontal: 20 }}>
                        <QRCode
                            value={qrCode}
                            size={215}
                            color={theme.colors.text}
                            backgroundColor="transparent"
                        />
                        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: '400', textAlign: 'center' }}>{translation.ticketDetailScreen.presentarQR}</Text>
                    </View>
                    :
                    <View><Text>{translation.ticketDetailScreen.qrNoValido}</Text></View>
                }

            </View>
        </View >
    )
}
