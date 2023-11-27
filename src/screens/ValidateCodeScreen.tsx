import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, TextInput, View, Text, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native'
import { vct } from '../theme/CodeValidatorTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useNavigation } from '@react-navigation/native'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const ValidateCodeScreen = () => {

    const navigation = useNavigation()
    const [code, setCode] = useState('')
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const route = useRoute()
    const { email }: any = route.params
    const { height } = useWindowDimensions()
    const [waiting, setWaiting] = useState(true)
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    const { getCode
        , isInvalidCode
        , setIsInvalidCode
        , loading
        , isExpiredCode
        , setIsExpiredCode
        , resendCode
        , isPendingCode
        , setIsPendingCode
        , isCodeResend
        , setIsCodeResend
    } = EmailLoginFunction()

    useEffect(() => {
        setTimeout(() => {
            setWaiting(false)
        }, 2500)
    }, [])

    useEffect(() => {
        if (isInvalidCode) {
            setTimeout(() => {
                setIsInvalidCode(false)
            }, 2500)
        }
    }, [isInvalidCode])

    useEffect(() => {
        if (isPendingCode) {
            setTimeout(() => {
                setIsPendingCode(false)
            }, 2500)
        }
    }, [isPendingCode])

    useEffect(() => {
        if (isCodeResend) {
            setTimeout(() => {
                setIsCodeResend(false)
            }, 2500)
        }
    }, [isCodeResend])

    useEffect(() => {
        if (isExpiredCode) {
            setTimeout(() => {
                setIsExpiredCode(false)
            }, 5000)
        }
    }, [isExpiredCode])

    return (
        <>
            {
                waiting
                    ? <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center' }}><ActivityIndicator size={'large'} color={customColors.activeColor} /></View>
                    : <ScrollView onScrollBeginDrag={Keyboard.dismiss} style={{ backgroundColor: colors.background }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "height" : 'null'}
                                keyboardVerticalOffset={height / 10}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, paddingTop: 10 }}
                            >
                                <View style={{ ...vct.container, backgroundColor: colors.background }}>
                                    <View style={{ ...vct.titleDiv }}>
                                        <Text style={{ ...vct.titleTxt, color: colors.text }}>{translation.validateCodeScreen.titleTxt}</Text>
                                        <Text style={{ ...vct.subtxt, color: colors.text }}>{translation.validateCodeScreen.subtxt}</Text>
                                    </View>

                                    <ToastMessageComponent
                                        backgroundColor={customColors.bgSuccesMessage}
                                        iconColor={customColors.colorSuccessMessage}
                                        textColor={customColors.colorSuccessMessage}
                                        title={translation.validateCodeScreen.bienHechoTitle}
                                        message={translation.validateCodeScreen.bienHechoMessage}
                                        visible={isCodeResend}
                                        iconName={'checkcircleo'}
                                    />

                                    <ToastMessageComponent
                                        backgroundColor={customColors.bgErrorMessage}
                                        iconColor={customColors.colorErrorMessage}
                                        textColor={customColors.colorErrorMessage}
                                        title={translation.validateCodeScreen.errorTitle}
                                        message={translation.validateCodeScreen.errorMessage}
                                        visible={isInvalidCode}
                                        iconName={'closecircleo'}
                                    />

                                    <ToastMessageComponent
                                        backgroundColor={customColors.bgErrorMessage}
                                        iconColor={customColors.colorErrorMessage}
                                        textColor={customColors.colorErrorMessage}
                                        title={translation.validateCodeScreen.errorTitle}
                                        message={translation.validateCodeScreen.errorVencidoMessage}
                                        visible={isExpiredCode}
                                        iconName={'closecircleo'}
                                    />

                                    <ToastMessageComponent
                                        textColor={customColors.colorWarningMessage}
                                        iconColor={customColors.colorWarningMessage}
                                        backgroundColor={customColors.bgWarningMessage}
                                        title={translation.validateCodeScreen.revisaEmailTitle}
                                        message={translation.validateCodeScreen.revisaEmailMessage}
                                        visible={isPendingCode}
                                        iconName={'exclamationcircleo'}
                                    />

                                    <View style={{ ...vct.codeDiv }}>
                                        <TextInput
                                            editable={!loading}
                                            style={{ ...vct.inputBox, color: currentTheme === 'light' ? 'black' : 'white', backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                                            keyboardType='decimal-pad'
                                            maxLength={6}
                                            value={code}
                                            onChangeText={text => setCode(text)}
                                            placeholder='______'
                                            placeholderTextColor={colors.text}
                                            clearButtonMode='while-editing'
                                        />

                                    </View>
                                    <View style={{ ...vct.buttonDiv, gap: 20 }}>
                                        <View style={{ flexDirection: 'row', gap: 5 }}>
                                            <Text style={{ color: 'gray', fontSize: 16 }}>{translation.validateCodeScreen.resendPrompt}</Text>
                                            <TouchableOpacity
                                                disabled={loading}
                                                onPress={() => resendCode(email)}
                                                hitSlop={{ bottom: 25, top: 25, left: 25, right: 25 }}>
                                                <Text style={{ fontWeight: 'bold', color: isExpiredCode ? customColors.activeColor : 'gray', fontSize: 16, textDecorationLine: 'underline', textTransform: isExpiredCode ? 'uppercase' : 'none' }}>{translation.validateCodeScreen.resendLink}</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: '100%', gap: 30 }}>
                                            <TouchableOpacity
                                                disabled={loading}
                                                onPress={() => getCode(email, code)}
                                                style={{ ...vct.btn, backgroundColor: customColors.buttonColor }}>
                                                {loading ? <ActivityIndicator color={'white'} style={{ height: 0, width: 150, borderRadius: 200 }} /> : <Text style={{ ...vct.btnTxt }}>{translation.validateCodeScreen.confirmButton}</Text>}
                                            </TouchableOpacity>

                                            <Text onPress={() => navigation.goBack()} style={{ fontSize: 17, fontWeight: 'bold', color: 'gray', alignSelf: 'center' }}>{translation.validateCodeScreen.cancelButton}</Text>
                                        </View>
                                    </View>
                                </View>
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </ScrollView>
            }
        </>
    )
}
