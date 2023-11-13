import React, { useContext, useState } from 'react'
import { StyleSheet, Platform, Pressable, View, Text, Modal, TouchableHighlight, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { dateFormmater, formatDate } from '../util/utils'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { authStyle } from '../theme/AuthTheme'
import moment from 'moment-timezone'
import 'moment/locale/es'; // Importa el idioma español

export const DatePickerComponent = (props) => {
    const { onDateChange, date, setDate } = props
    const [show, setShow] = useState(false)
    const { theme } = useContext(ThemeContext)
    const maxDate = new Date()
    const today = maxDate.setHours(maxDate.getHours() - 3)

    const onChange = (e, selectDate) => {
        setDate(new Date(selectDate))
    }

    const onAndroidChange = (e, selectDate) => {
        setShow(false)
        if (selectDate) {
            setDate(new Date(selectDate))
        }

    }

    const onCancelPress = () => {
        onDateChange(new Date(date))
        setShow(false)
    }

    const onDonePress = () => {
        onDateChange(date)
        setShow(false)
    }

    const renderDatePicker = () => {
        return (
            <>
                <DateTimePicker
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    // timeZoneOffsetInMinutes={0}
                    value={new Date(date)}
                    mode='date'
                    minimumDate={new Date(1900, 1, 1)}
                    maximumDate={new Date(today)}
                    onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
                    textColor={theme.currentTheme === 'light' ? 'black' : 'white'}
                    locale='es'
                />
            </>
        )
    }
    moment.locale('ES'); // Establece el idioma a español
    const formattedDate = moment(date).format('DD MMMM YYYY');
    return (

        <Pressable style={{ ...authStyle.ef, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} onPress={() => {
            setShow(true)
            Keyboard.dismiss()
        }}>
            <View>
                <Text style={{ ...styles.text, color: theme.colors.text }}>{formattedDate}</Text>
                {Platform.OS !== 'ios' && show && renderDatePicker()}


                {Platform.OS === 'ios' && show && (

                    <Modal
                        transparent={true}
                        animationType='slide'
                        visible={show}
                        supportedOrientations={['portrait']}
                        onRequestClose={() => setShow(!show)}
                    >

                        <View style={{ ...styles.screen }}>
                            <View
                                style={{ ...styles.pickerContainer, backgroundColor: theme.colors.background, shadowColor: theme.colors.text, }}
                            >
                                <View>
                                    <View style={{ marginTop: 20 }}>{renderDatePicker()}</View>
                                    <TouchableOpacity onPress={onCancelPress}
                                        style={[styles.btnText, styles.btnCancel]}
                                    >
                                        <Text style={{ color: theme.colors.text, fontSize: 18 }}>Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={onDonePress}
                                        style={[styles.btnText, styles.btnDone]}
                                    >
                                        <Text style={{ color: theme.colors.text, fontSize: 18 }}>Aceptar</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({

    pickerContainer: {
        backgroundColor: 'white',
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 0
        , borderTopRightRadius: 15
        , borderTopLeftRadius: 15
        , shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    text: {
        fontSize: 18
    },
    screen: {
        flex: 1
    },

    btnText: {
        position: 'absolute',
        top: 0,
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        // justifyContent: 'center'
        alignItems: 'center'
    },
    btnCancel: {
        left: 0
    },
    btnDone: {
        right: 0
    }
})
