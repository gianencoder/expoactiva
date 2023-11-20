
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform, Button, TouchableWithoutFeedback, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
import { MultiSelectComponent } from '../components/MultiSelectComponent'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { data } from '../util/utils'
import { Feather } from '@expo/vector-icons';


export const LoginFormScreen = () => {

    const { theme } = useContext(ThemeContext)
    const [emptyField, setEmptyField] = useState(false)
    const { height } = useWindowDimensions()
    const [name, setName] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const { signUp, loading } = EmailLoginFunction()
    const [selected, setSelected] = useState([]);
    const route = useRoute()
    const navigation = useNavigation()
    const [date, setDate] = useState('')
    const [bornDay, setBornDay] = useState(new Date('1900-01-01'))
    const { email }: any = route.params
    const prevLengthRef = useRef(0);
    const [day, month, year] = date.split('-');
    const [badDate, setBadDate] = useState(false)


    const numericDay = parseInt(day, 10);
    const numericMonth = parseInt(month, 10);
    const numericYear = parseInt(year, 10);


    useEffect(() => {
        if (date.length === 2) {
            if (date.length > prevLengthRef.current) {
                setDate(date + '-');
            }
        }
        if (date.length === 3 && date[2] !== '-') {
            if (date.length > prevLengthRef.current) {
                const date1 = date.slice(0, 2)
                const date2 = date.slice(-1)
                setDate(date1 + '-' + date2)
            }
        }
        if (date.length === 5) {

            if (date.length > prevLengthRef.current) {
                setDate(date + '-');

            }
        }
        if (date.length === 6 && date[5] !== '-') {
            if (date.length > prevLengthRef.current) {
                const date1 = date.slice(0, 2)
                const date2 = date.slice(3, 5)
                const date3 = date.slice(-1)
                setDate(date1 + '-' + date2 + '-' + date3)
            }
        }
        if (date.length === 10 || date.length > 6 && date[5] !== '-') {
            if (date.length > prevLengthRef.current) {
                const date1 = date.slice(0, 2)
                const date2 = date.slice(3, 5)
                const date3 = date.slice(-4)
                setDate(date1 + '-' + date2 + '-' + date3)
            }
        }
        prevLengthRef.current = date.length;
        setBornDay(new Date(numericYear, numericMonth - 1, numericDay))
    }, [date])

    const handleSignUp = () => {
        Keyboard.dismiss()
        if (name == '' || date == '') {
            setIsVisible(true)
            setEmptyField(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)
        }

        else if (numericDay <= 0 || numericDay > 31 || numericMonth <= 0 || numericMonth > 12 || numericYear < 1900 || numericYear >= new Date().getFullYear() || bornDay >= new Date() || date.length !== 10) {
            setBadDate(true)
            setTimeout(() => {
                setBadDate(false)
            }, 2500)

            return
        }
        else {
            signUp(name, email, bornDay, selected)
        }
    }
    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSelect = (i) => {
        // Verificar si el interés ya está en la lista selected
        const isSelected = selected.includes(i.label);

        if (isSelected) {
            // Si ya está seleccionado, lo eliminamos
            const newSelected = selected.filter((item) => item !== i.label);
            setSelected(newSelected);
        } else {
            // Si no está seleccionado, lo agregamos
            setSelected([...selected, i.label]);
        }
    }


    return (

        <ScrollView onScroll={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
                <KeyboardAvoidingView
                    behavior={"height"}
                    keyboardVerticalOffset={height / 10}
                    style={{ flex: 1, backgroundColor: theme.colors.background }}
                >
                    <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                        <View style={{ flex: 1, gap: 25 }}>
                            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 30, color: theme.colors.text, fontWeight: '400' }}>Crear cuenta</Text>
                            <ToastMessageComponent
                                iconName={'closecircleo'}
                                textColor={theme.customColors.colorErrorMessage}
                                iconColor={theme.customColors.colorErrorMessage}
                                backgroundColor={theme.customColors.bgErrorMessage}
                                width={'100%'}
                                iconSize={24}
                                visible={isVisible}
                                title={'¡Error!'}
                                message={name.length <= 0 ? 'Nombre y apellido es un campo obligatorio' : 'Debes ingresar una fecha'} />
                            <ToastMessageComponent
                                iconName={'closecircleo'}
                                textColor={theme.customColors.colorErrorMessage}
                                iconColor={theme.customColors.colorErrorMessage}
                                backgroundColor={theme.customColors.bgErrorMessage}
                                width={'100%'}
                                iconSize={24}
                                visible={badDate}
                                title={'¡Error!'}
                                message={'Debes ingresar una fecha válida'} />

                            <View style={authStyle.formView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Nombre y Apellido </Text>
                                    <Text style={{ fontSize: name === '' ? 25 : 20, color: name === '' ? 'red' : theme.colors.text }}>*</Text>
                                </View>
                                <TextInput
                                    editable={!loading}
                                    clearButtonMode='while-editing'
                                    maxLength={50}
                                    keyboardType='default'
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                                    placeholder='Nombre y Apellido'
                                    placeholderTextColor={'gray'} />
                            </View>

                            <View style={authStyle.formView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Fecha de nacimiento</Text>
                                    <Text style={{ fontSize: date === '' ? 25 : 20, color: date === '' ? 'red' : theme.colors.text }}>*</Text>
                                </View>

                                <TextInput
                                    editable={!loading}
                                    maxLength={10}
                                    clearButtonMode='while-editing'
                                    keyboardType='numeric'
                                    value={date}
                                    onChangeText={text => setDate(text)}
                                    style={{ ...authStyle.ef, color: badDate ? 'red' : theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                                    placeholder='DD-MM-YYYY'
                                    placeholderTextColor={'gray'} />
                            </View>

                            <View style={{ ...authStyle.formView, gap: 15 }}>
                                <Text style={{ fontSize: 16, color: theme.colors.text }}>Seleccionar intereses</Text>
                                <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
                                <View style={{ flexDirection: 'row', gap: 15, flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
                                    {data.map(i => (
                                        <TouchableOpacity
                                            key={i.value}
                                            onPress={() => handleSelect(i)}
                                            style={{ backgroundColor: selected.includes(i.label) ? 'transparent' : 'transparent', flexDirection: 'row', borderWidth: 0.5, height: 25, justifyContent: 'center', alignItems: 'center', gap: 3, borderColor: !selected.includes(i.label) ? theme.colors.text : theme.customColors.activeColor, paddingHorizontal: 5, borderRadius: 5 }}>
                                            <Text style={{ color: !selected.includes(i.label) ? theme.colors.text : theme.customColors.activeColor }} >{i.label}</Text>
                                            {selected.includes(i.label) && <Feather name="x" size={16} color={!selected.includes(i.label) ? theme.colors.text : theme.customColors.activeColor} />}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                            <View style={authStyle.formView}>
                                <TouchableOpacity
                                    disabled={loading}
                                    onPress={handleSignUp}
                                    style={{
                                        backgroundColor: name !== '' && date.length === 10 ? theme.customColors.buttonColor : '#DBD8E3'
                                        , height: 40
                                        , width: '100%'
                                        , borderRadius: 10
                                        , justifyContent: 'center'
                                        , alignItems: 'center'
                                        , alignSelf: 'center'
                                        , marginVertical: 10
                                    }}>
                                    {loading ? <ActivityIndicator color={'white'} /> : <Text style={{ color: name !== '' && date.length === 10 ? 'white' : '#4B5D67', letterSpacing: 1 }}>{name === '' || date.length !== 10 ? 'COMPLETA TODA LA INFORMACIÓN' : 'CREAR'}</Text>}
                                </TouchableOpacity>
                                <Text onPress={() => navigation.goBack()}
                                    style={{ alignSelf: 'center', fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView >
            </TouchableWithoutFeedback >
        </ScrollView>
    )
}
