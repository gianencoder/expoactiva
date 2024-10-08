import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, StyleSheet, Clipboard, Animated } from 'react-native'
import { ticketStyles } from '../theme/TicketsTheme'
import QRCode from "react-native-qrcode-svg";
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { useTicketManager } from '../hooks/useTicketManager';
import { MaterialIcons } from '@expo/vector-icons';
import { loadTranslations, translations } from '../util/utils';
import { useLanguage } from '../context/LanguageContext/LanguageContext';

export const TicketComponent = ({ ticket, qrCode, method }) => {

    const { theme } = useContext(ThemeContext)
    const { shareTicket, isTicketShared } = useTicketManager(ticket)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [sharedTicket, setSharedTicket] = useState(isTicketShared);
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);


    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);


    useEffect(() => {
        setSharedTicket(isTicketShared);
    }, [isTicketShared]);

    const handlePress = () => {

        if (ticket.used) {
            return;
        }

        if (sharedTicket) {
            setIsModalVisible(true);
        } else {
            method();
        }
    };

    const handleCopyToClipboard = () => {
        Clipboard.setString(ticket.ticketId);

        // Fade in
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();

        setTimeout(() => {
            // Fade out
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();
        }, 1000);
    };

    const styles = StyleSheet.create({
        modalView: {
            top: '35%',
            marginHorizontal: 20,
            backgroundColor: theme.colors.background,
            borderRadius: 20,
            padding: 55,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            position: 'relative',
            zIndex: 3,
        },
        closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        copyButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        copyNotification: {
            position: 'absolute',
            zIndex: 4,
            top: 150,
            alignSelf: 'center',
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={handlePress}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            disabled={ticket.used}
        >

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsModalVisible(false)}
                        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                    >
                        <MaterialIcons name="close" size={24} color={theme.customColors.activeColor} />
                    </TouchableOpacity>

                    <Text style={{ marginBottom: 15, textAlign: 'center', fontSize: 17, fontWeight: '500', color: theme.colors.text }}>{translation.ticketComponent.sharedModalMessage}{"\n"}{"\n"}{ticket.ticketId}</Text>

                    <TouchableOpacity
                        style={styles.copyButton}
                        onPress={handleCopyToClipboard}
                        hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
                    >
                        <MaterialIcons name="content-copy" size={24} color={theme.customColors.activeColor} />
                    </TouchableOpacity>
                    <Animated.View
                        style={{
                            ...styles.copyNotification,
                            opacity: fadeAnim, // Enlaza la opacidad a la variable de animación
                        }}
                    >
                        <Text style={{ color: 'white' }}>{translation.ticketComponent.copy}</Text>
                    </Animated.View>
                </View>
            </Modal>

            <View style={ticketStyles.listTicketContainer}>
                <View style={ticketStyles.imgContainer}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <QRCode
                            value={qrCode}
                            size={80}
                            color={(sharedTicket || ticket.used) ? theme.currentTheme === 'dark' ? 'gray' : 'lightgray' : theme.colors.text}
                            backgroundColor="transparent"
                        />
                    </View>
                </View>

                <View style={ticketStyles.infoContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}>
                        <Text style={{ color: (sharedTicket || ticket.used) ? theme.customColors.subtitles : theme.colors.text, fontSize: 15, fontWeight: '500' }}>Expoactiva Nacional Soriano</Text>
                        <TouchableOpacity
                            onPress={() => (!sharedTicket && !ticket.used) && shareTicket(ticket.ticketId)}
                            disabled={sharedTicket || ticket.used}
                            hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }}>
                            <Image
                                style={{
                                    height: 20,
                                    width: 20,
                                    alignSelf: 'flex-end',
                                    tintColor: (sharedTicket || ticket.used) ? 'gray' : theme.customColors.activeColor
                                }}
                                source={require('../assets/icons/share.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: theme.customColors.subtitles }}>{translation.ticketComponent.ticket} {sharedTicket ? translation.ticketComponent.share : ticket.used ? translation.ticketComponent.noValid : translation.ticketComponent.valid}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}
