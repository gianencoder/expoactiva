
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform, Button, TouchableWithoutFeedback, useWindowDimensions, KeyboardAvoidingView } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { authStyle } from '../theme/AuthTheme'
//import { DatePickerComponent } from '../components/DatePickerComponent'
import { MultiSelectComponent } from '../components/MultiSelectComponent'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

const data = [
    { label: 'Agricultura', value: 'Agricultura' },
    { label: 'Automóviles', value: 'Automóviles' },
    { label: 'Ganadería', value: 'Ganadería' },
    { label: 'Lácteos', value: 'Lacteos' },
    { label: 'Máquinas', value: 'Máquinas' },
    { label: 'Tecnología', value: 'Tecnología' },
];


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
    const { email }: any = route.params
    //const defaultDate = new Date()
   // const fixedDate = defaultDate.setHours(defaultDate.getHours() - 3)
    //const [date, setDate] = useState<Date>(new Date(fixedDate))
    //const now = new Date(fixedDate)
    //const isToday = date.toISOString().split('T')[0] === now.toISOString().split('T')[0];

    const handleSignUp = () => {
        Keyboard.dismiss()
        if (name == '') {
            setIsVisible(true)
            setEmptyField(true)
            setTimeout(() => {
                setIsVisible(false)
            }, 2500)

        } else {
            // console.log(date)
            signUp(name, email, new Date('2000-01-01'), selected)
        }
    }
    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        loading
            ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 50, backgroundColor: theme.colors.background }}>
                <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 0, backgroundColor: theme.colors.background, borderRadius: 200 }} />
                <Text style={{ fontSize: 18, color: 'gray' }}>Obteniendo información. Por favor, espere...</Text>
            </View>
            : <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
                <KeyboardAvoidingView
                    behavior= {"height"}
                    keyboardVerticalOffset={height / 10}
                    style={{ flex: 1, backgroundColor: theme.colors.background }}
                >
                    <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                        <View style={{ flex: 1, gap: 25 }}>
                            <Text style={{ alignSelf: 'center', padding: 20, fontSize: 25, color: theme.colors.text }}>Crear cuenta</Text>
                            <ToastMessageComponent
                                iconName={'closecircleo'}
                                textColor={theme.customColors.colorErrorMessage}
                                iconColor={theme.customColors.colorErrorMessage}
                                backgroundColor={theme.customColors.bgErrorMessage}
                                width={'100%'}
                                iconSize={24}
                                visible={isVisible}
                                title={'¡Error!'}
                                message={name.length <= 0 ? 'Los campos con * son obligatorios' : 'Debes seleccionar una fecha'} />

                            <View style={authStyle.formView}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Nombre y Apellido </Text>
                                    <Text style={{ fontSize: name === '' ? 25 : 20, color: name === '' ? 'red' : theme.colors.text }}>*</Text>
                                </View>
                                <TextInput
                                    clearButtonMode='while-editing'
                                    maxLength={50}
                                    keyboardType='default'
                                    value={name}
                                    onChangeText={text => setName(text)}
                                    style={{ ...authStyle.ef, color: theme.colors.text, backgroundColor: theme.currentTheme === 'light' ? '#e8e8e8' : '#272727' }} placeholder='Nombre y apellido' placeholderTextColor={'gray'} />
                            </View>
                            <View style={authStyle.formView}>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ ...authStyle.formLabel, color: theme.colors.text }}>Fecha de nacimiento</Text>
                                    {/* <Text style={{ fontSize: isToday ? 25 : 20, color: isToday ? 'red' : theme.colors.text }}>*</Text> */}
                                </View>

                                {/* <DatePickerComponent
                                    onPress={() => Keyboard.dismiss()}
                                    onDateChange={value => setDate(value)}
                                    date={date}
                                    setDate={setDate}
                                /> */}
                                <MultiSelectComponent
                                    onChange={item => {
                                        setSelected(item)
                                    }}
                                    data={data} selected={selected} />
                            </View>
                            <View style={authStyle.formView}>
                                <TouchableOpacity
                                    onPress={handleSignUp}
                                    style={{
                                        backgroundColor: name !== '' ? theme.customColors.buttonColor : '#DBD8E3'
                                        , height: 40
                                        , width: '100%'
                                        , borderRadius: 10
                                        , justifyContent: 'center'
                                        , alignItems: 'center'
                                        , alignSelf: 'center'
                                        , marginVertical: 10
                                    }}>
                                    <Text style={{ color: name !== '' ? 'white' : '#4B5D67', letterSpacing: 1 }}>{name === '' ? 'COMPLETA TODA LA INFORMACIÓN' : 'CREAR'}</Text>
                                </TouchableOpacity>
                                <Text onPress={() => navigation.navigate('AuthScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: theme.currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView >
            </TouchableWithoutFeedback >
    )
}
