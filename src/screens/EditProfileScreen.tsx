import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Keyboard } from 'react-native'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { authStyle } from '../theme/AuthTheme'
import { useFocusEffect } from '@react-navigation/native';
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { data } from '../util/utils'
import { Feather } from '@expo/vector-icons'


export const EditProfileScreen = () => {
    const navigation = useNavigation()
    const { editUser, loading, updated } = EmailLoginFunction()
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const { user, setPending, pending } = useAuthContext()
    const [name, setName] = useState('')
    const [bornDay, setBornDay] = useState(new Date('1900-01-01'))
    const [selected, setSelected] = useState<[]>([]);
    const [showToast, setShowToast] = useState(false)
    const [emptyName, setEmptyName] = useState(false)
    const [date, setDate] = useState('')
    const [day, month, year] = date.split('-');
    const [badDate, setBadDate] = useState(false)
    const prevLengthRef = useRef(0);
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

    const handleUpdateUser = (email: string, name: string, selected: [], bornDay: string) => {

        if (name == '' || name.length <= 0) {
            setEmptyName(true)
            setTimeout(() => {
                setEmptyName(false)
            }, 2500)
            return
        }

        if (date.length <= 0 && user?.birthDay == '' || user?.birthDay == null) {
            setBadDate(true)
            setTimeout(() => {
                setBadDate(false)
            }, 2500)
            return
        }

        if (numericDay <= 0 || numericDay > 31 || numericMonth <= 0 || numericMonth > 12 || numericYear < 1900 || numericYear >= new Date().getFullYear() || bornDay >= new Date() || date.length !== 10) {
            setBadDate(true)
            setTimeout(() => {
                setBadDate(false)
            }, 2500)
            return
        }

        editUser(email, name, selected, user?.birthDay == '' || user?.birthDay == null ? bornDay : user.birthDay)
        if (updated) {
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2800)
        }
    }

    useEffect(() => {
        if (updated) {
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 2800)
        }
    }, [updated])

    useFocusEffect(
        React.useCallback(() => {
            if (user !== null) {
                setName(user.name)
                setSelected(user.interests)
            }
        }, [])
    );

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

    useEffect(() => {
        if (user !== null)
            if (user?.interests.length > 0) {
                setPending(false)

            } else {

                setPending(true)
            }
    }, [pending])

    const handleScroll = () => {
        Keyboard.dismiss()
    }


    return (

        <ScrollView onScrollBeginDrag={handleScroll} style={{ backgroundColor: colors.background }}>
            <View style={{ ...editProfileTheme.container, backgroundColor: colors.background, gap: 20 }}>
                <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                    <Text style={{ ...editProfileTheme.title, color: colors.text }}>Editar perfil</Text>
                </View>
                <ToastMessageComponent
                    width={'100%'}
                    visible={showToast}
                    title={'¡Bien hecho!'}
                    message={'Usuario guardado con éxito'}
                    backgroundColor={customColors.bgSuccesMessage}
                    iconColor={customColors.colorSuccessMessage}
                    textColor={customColors.colorSuccessMessage}
                />
                <ToastMessageComponent
                    width={'100%'}
                    visible={emptyName}
                    title={'¡Error!'}
                    message={'El campo nombre es obligatorio'}
                    backgroundColor={customColors.bgErrorMessage}
                    iconColor={customColors.colorErrorMessage}
                    textColor={customColors.colorErrorMessage}
                    iconName='closecircleo'
                />

                <ToastMessageComponent
                    width={'100%'}
                    visible={badDate}
                    title={'¡Error!'}
                    message={'El campo fecha es obligatorio'}
                    backgroundColor={customColors.bgErrorMessage}
                    iconColor={customColors.colorErrorMessage}
                    textColor={customColors.colorErrorMessage}
                    iconName='closecircleo'
                />

                <View style={editProfileTheme.div}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                        <Text style={{ ...authStyle.formLabel, color: colors.text }}>Nombre y Apellido</Text>
                        <Text style={{ fontSize: date === '' ? 25 : 20, color: name === '' ? 'red' : colors.text }}>*</Text>
                    </View>

                    <TextInput
                        clearButtonMode='while-editing'
                        maxLength={50}
                        keyboardType='default'
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                        placeholder='Nombre y Apellido' placeholderTextColor={'gray'} />
                </View>

                {user?.birthDay == "" || user?.birthDay == null ?
                    <View style={editProfileTheme.div}>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-start', gap: 15 }}>
                            <View style={{ flexDirection: 'row', gap: 2 }}>
                                <Text style={{ ...authStyle.formLabel, color: colors.text, alignSelf: 'center' }}>Fecha de nacimiento</Text>
                                {date.length <= 0 && <View style={{ height: 10, width: 10, borderRadius: 20, backgroundColor: 'orange', alignSelf: 'center' }} />}
                            </View>
                            <Text style={{ fontSize: date === '' || date.length <= 0 ? 25 : 20, color: date === '' || date.length <= 0 ? 'red' : colors.text }}>*</Text>
                        </View>

                        <TextInput
                            maxLength={10}
                            clearButtonMode='while-editing'
                            keyboardType='numeric'
                            value={date}
                            onChangeText={text => setDate(text)}
                            style={{ ...authStyle.ef, color: badDate ? 'red' : colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                            placeholder='DD-MM-YYYY'
                            placeholderTextColor={'gray'} />
                    </View>
                    : <View />
                }

                <View style={{ gap: 15 }}>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <Text style={{ fontSize: 16, color: colors.text }}>Seleccionar intereses</Text>
                        {user?.interests.length <= 0 && selected.length <= 0 && <View style={{ height: 10, width: 10, borderRadius: 20, backgroundColor: 'orange', alignSelf: 'center' }} />}
                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
                    <View style={{ flexDirection: 'row', gap: 15, flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>

                        {data.map(i => (
                            <TouchableOpacity
                                key={i.value}
                                onPress={() => handleSelect(i)}
                                style={{
                                    backgroundColor: selected.includes(i.label) ? customColors.buttonColor : 'transparent'
                                    , flexDirection: 'row'
                                    , borderWidth: !selected.includes(i.label) ? 1 : 0
                                    , height: 25
                                    , justifyContent: 'center', alignItems: 'center'
                                    , gap: 3
                                    , borderColor: colors.text
                                    , paddingHorizontal: 5
                                    , borderRadius: 5
                                }}>
                                <Text style={{ color: !selected.includes(i.label) ? colors.text : 'white' }} >{i.label}</Text>
                                {selected.includes(i.label) && <Feather name="x" size={16} color={!selected.includes(i.label) ? colors.text : 'white'} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                {/* <MultiSelectComponent
                    onChange={item => {
                        setSelected(item)
                    }}
                    data={data} selected={selected} /> */}
                <View style={editProfileTheme.div}>
                    <TouchableOpacity
                        disabled={loading}
                        onPress={() => handleUpdateUser(user !== null ? user.email : '', name, selected, date)}
                        style={{
                            backgroundColor: customColors.buttonColor
                            , height: 40
                            , width: '100%'
                            , borderRadius: 10
                            , justifyContent: 'center'
                            , alignItems: 'center'
                            , alignSelf: 'center'
                            , marginVertical: 10
                        }}>
                        <Text style={{ color: 'white', letterSpacing: 1 }}>{loading ? <ActivityIndicator color={'white'} size={'small'} /> : 'GUARDAR'}</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.goBack()} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>


                </View>
            </View>
        </ScrollView>
    )
}


