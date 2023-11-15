import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { authStyle } from '../theme/AuthTheme'
import { useNavigation } from '@react-navigation/native'
import { useTicketManager } from '../hooks/useTicketManager'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useRedeemTicket } from '../context/RedeemTicketContext/RedeemTicketContext'

export const ReedemTicketScreen = () => {
    const mounted = useRef(false);
    const { theme, theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const navigation = useNavigation()
    const { redeemTicket, loading } = useTicketManager()
    const [code, setCode] = useState('')
    const [emptyCode, setEmptyCode] = useState(false)
    const [showErrorTicketToast, setShowErrorTicketToast] = useState(false);
    const { claimedTicket, redeemTicketAttempt } = useRedeemTicket();

    useEffect(() => {

        if (mounted.current) {
            if (!claimedTicket) {
                setTimeout(() => {
                    setShowErrorTicketToast(true);
                }, 500);
                setTimeout(() => {
                    setShowErrorTicketToast(false);
                }, 2800);
            }
        } else {
            mounted.current = true;
        }
    }, [redeemTicketAttempt]);

    const handleReedem = () => {
        if (code.length <= 0) {
            setEmptyCode(true)
            setTimeout(() => {
                setEmptyCode(false)
            }, 2500)
        } else {
            Keyboard.dismiss()
            redeemTicket(code)
        }
    }

    // const renderLoadingSpinner = () => {
    //     return (
    //         <Modal
    //             transparent={true}
    //             animationType="none"
    //             visible={loading}
    //         >
    //             <View style={styles.modalBackground}>
    //                 <View style={styles.activityIndicatorWrapper}>
    //                     <ActivityIndicator
    //                         animating={loading}
    //                         size="large"
    //                         color={theme.customColors.activeColor}
    //                     />
    //                 </View>
    //             </View>
    //         </Modal>
    //     );
    // };

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        activityIndicatorWrapper: {
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 50,
        },
    });

    return (

        <>
            {loading

                ? <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme.colors.background }}><ActivityIndicator size={'large'} color={theme.customColors.activeColor} /></View>
                : <View style={{ ...ticketStyles.container2, backgroundColor: colors.background }}>
                    <Text style={{ fontSize: 25, color: colors.text }}>Canjea tu entrada</Text>
                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title='¡Error!'
                        message={'Introduce un código, por favor'}
                        visible={emptyCode}
                        iconName={'closecircleo'}
                    />
                    <ToastMessageComponent
                        backgroundColor={customColors.bgErrorMessage}
                        iconColor={customColors.colorErrorMessage}
                        textColor={customColors.colorErrorMessage}
                        title='¡Error!'
                        message={'La entrada no existe o no está compartida'}
                        visible={showErrorTicketToast}
                        iconName={'closecircleo'}
                    />
                    <View style={editProfileTheme.div}>
                        <View style={{ width: '100%', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                            <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>Código</Text>
                            <Text style={{ ...editProfileTheme.labelName, color: emptyCode ? 'red' : colors.text, fontSize: emptyCode ? 25 : 18 }}>*</Text>
                        </View>

                        <TextInput
                            clearButtonMode='while-editing'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoComplete='off'
                            maxLength={50}
                            keyboardType='default'
                            value={code}
                            onChangeText={text => setCode(text)}
                            style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                            placeholder='Tu código aquí...' placeholderTextColor={'gray'} />
                    </View>
                    <TouchableOpacity
                        onPress={handleReedem}
                        style={{
                            backgroundColor: code.length > 0 ? '#F05950' : 'gray'
                            , height: 40
                            , width: '100%'
                            , borderRadius: 10
                            , justifyContent: 'center'
                            , alignItems: 'center'
                            , alignSelf: 'center'
                        }}>
                        <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>{code.length > 0 ? 'CANJEAR' : 'INGRESA UN CÓDIGO'}</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('TicketsScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18 }}>Cancelar</Text>
                </View>
            }
        </>

    )
}
