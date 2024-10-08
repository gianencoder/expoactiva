import React, { useContext, useEffect, useState, useRef } from 'react'
import { View, Text, Image, TouchableOpacity, useWindowDimensions, ActivityIndicator, Modal, StyleSheet } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useTicketManager } from '../hooks/useTicketManager'
import { usePayment } from '../context/PaymentContext/PaymentContext'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useLanguage } from '../context/LanguageContext/LanguageContext'
import { loadTranslations, translations } from '../util/utils'

export const BuyTicketScreen = () => {
    const { theme } = useContext(ThemeContext)
    const { height } = useWindowDimensions()
    const [price] = useState(250)
    const [showToast, setShowToast] = useState(false)
    const { purchaseTicket, operations, quantity, loading } = useTicketManager()
    const { payment, paymentAttempt } = usePayment();
    const mounted = useRef(false);
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);

    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    useEffect(() => {
        console.log('ejecuta')
        if (mounted.current) {
            console.log('payment', payment)
            if (!payment) {
                setTimeout(() => {
                    setShowToast(true);
                }, 500);
                setTimeout(() => {
                    setShowToast(false);
                }, 2800);
            }
        } else {
            mounted.current = true;
        }
    }, [paymentAttempt]);


    const handleConfirmPress = () => {
        purchaseTicket();
    }

    const renderLoadingSpinner = () => {
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={loading}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading}
                            size="large"
                            color={theme.customColors.activeColor}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

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

        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {renderLoadingSpinner()}
            <ToastMessageComponent
                width={'95%'}
                visible={showToast}
                title={translation.buyTicketScreen.showToastTitle}
                message={translation.buyTicketScreen.showToastMessage}
                backgroundColor={theme.customColors.bgErrorMessage}
                iconColor={theme.customColors.colorErrorMessage}
                textColor={theme.customColors.colorErrorMessage}
                iconName={'closecircleo'}
            />
            <View style={{ ...ticketStyles.btv, flex: 2 }}>
                <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/Expoactiva.jpg')} />
            </View>


            <View style={{ ...ticketStyles.btv, backgroundColor: theme.colors.background, padding: 10, gap: 15 }}>
                <Text style={{ ...ticketStyles.btt, alignSelf: 'flex-start', color: theme.colors.text, fontWeight: 'bold' }}>Expoactiva Nacional</Text>
                <View style={{ alignSelf: 'flex-start', flexDirection: 'row', width: '100%' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...ticketStyles.btt, color: theme.colors.text }}>{translation.buyTicketScreen.quantityLabel}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => operations(1)} style={{ ...ticketStyles.tbtn, backgroundColor: theme.dividerColor, height: height / 25 }}>
                            <Text style={{ ...ticketStyles.btt, color: 'white', fontSize: height / 40 }}>-</Text>
                        </TouchableOpacity>

                        <Text style={{ color: theme.colors.text, fontSize: height / 30 }}>{quantity}</Text>

                        <TouchableOpacity onPress={() => operations(0)} style={{ ...ticketStyles.tbtn, backgroundColor: theme.dividerColor, height: height / 25 }}>
                            <Text style={{ ...ticketStyles.btt, color: 'white', fontSize: height / 40 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'flex-start', width: '100%' }}>
                    <Text style={{ ...ticketStyles.btt, color: theme.colors.text, fontWeight: 'bold' }}>{translation.buyTicketScreen.totalLabel}</Text>
                    <Text style={{ ...ticketStyles.btt, color: theme.colors.text }}>${price * quantity}</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={handleConfirmPress} style={{
                        width: '90%'
                        , height: '100%'
                        , justifyContent: 'center'
                        , backgroundColor: theme.customColors.buttonColor
                        , alignItems: 'center'
                        , borderRadius: 10
                    }}>
                        <Text style={{ ...ticketStyles.btt, color: 'white', fontVariant: ['small-caps'], letterSpacing: 1 }}>{translation.buyTicketScreen.confirmButton}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}
