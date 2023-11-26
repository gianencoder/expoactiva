import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { privacyTheme } from '../theme/PrivacyPolicyTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { Text } from 'react-native'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const PrivacyPolicyScreen = () => {

    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    const { theme: { colors } } = useContext(ThemeContext)
    return (
        <View style={{ ...privacyTheme.container, backgroundColor: colors.background }}>

            <ScrollView style={{ backgroundColor: colors.background, flex: 1 }}>
                <View style={{ flex: 3, gap: 15 }}>
                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.termsAndPrivacyTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.welcomeText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.infoCollectedTitle}
                    </Text>

                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        {translation.privacyPolicyScreen.locationCoordinatesSubtitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.locationCoordinatesText}
                    </Text>

                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        {translation.privacyPolicyScreen.eventInfoSubtitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.eventInfoText}
                    </Text>

                    <Text style={{ ...privacyTheme.subtitle, color: 'gray' }}>
                        {translation.privacyPolicyScreen.interestsAgeSubtitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.interestsAgeText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.useOfInformationTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.useOfInformationText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.dataProtectionLawsTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.dataProtectionLawsText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.rightToRejectTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.rightToRejectText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.privacyPolicyChangesTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.privacyPolicyChangesText}
                    </Text>

                    <Text style={{ ...privacyTheme.title, color: colors.text }}>
                        {translation.privacyPolicyScreen.contactTitle}
                    </Text>
                    <Text style={{ ...privacyTheme.text, color: colors.text }}>
                        {translation.privacyPolicyScreen.contactText}
                    </Text>
                </View>
            </ScrollView>
        </View >
    )
}
