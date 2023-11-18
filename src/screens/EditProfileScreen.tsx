import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { authStyle } from '../theme/AuthTheme'
import { useFocusEffect } from '@react-navigation/native';
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { data } from '../util/utils'


export const EditProfileScreen = () => {
    const navigation = useNavigation()
    const { editUser, loading, updated } = EmailLoginFunction()
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const { user, setPending, pending } = useAuthContext()
    const [name, setName] = useState('')
    const [selected, setSelected] = useState([]);
    const [showToast, setShowToast] = useState(false)
    const [emptyName, setEmptyName] = useState(false)



    const handleUpdateUser = (email: string, name: string, selected: []) => {

        if (name == '' || name.length <= 0) {
            setEmptyName(true)
            setTimeout(() => {
                setEmptyName(false)
            }, 2500)
            return
        }

        editUser(email, name, selected)
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
            setName(user.name)
            setSelected(user.interests)
            return () => {
            };
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
        if (user?.interests.length > 0) {
            setPending(false)

        } else {

            setPending(true)
        }
    }, [pending])

    return (
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
            />

            <View style={editProfileTheme.div}>
                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', gap: 15, }}>
                    <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>Nombre y Apellido</Text>
                    <Text style={{ ...editProfileTheme.labelName, color: name == '' ? 'red' : colors.text, fontSize: emptyName ? 25 : 20, bottom: 5 }}>*</Text>
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

            <View style={{ gap: 15 }}>
                <Text style={{ fontSize: 16, color: colors.text }}>Seleccionar intereses</Text>
                <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }} />
                <View style={{ flexDirection: 'row', gap: 15, flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>

                    {data.map(i => (
                        <TouchableOpacity
                            key={i.value}
                            onPress={() => handleSelect(i)}
                            style={{ backgroundColor: selected.includes(i.label) ? 'transparent' : 'transparent', flexDirection: 'row', borderWidth: 0.5, height: 25, justifyContent: 'center', alignItems: 'center', gap: 3, borderColor: !selected.includes(i.label) ? colors.text : customColors.activeColor, paddingHorizontal: 5, borderRadius: 5 }}>
                            <Text style={{ color: !selected.includes(i.label) ? colors.text : customColors.activeColor }} >{i.label}</Text>
                            {selected.includes(i.label) && <Feather name="x" size={16} color={!selected.includes(i.label) ? colors.text : customColors.activeColor} />}
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
                    onPress={() => handleUpdateUser(user.email, name, selected)}
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
                <Text onPress={() => navigation.navigate('AuthScreen')} style={{ alignSelf: 'center', fontWeight: '600', color: currentTheme === 'light' ? '#474747' : '#787878', fontSize: 18, padding: 10, }}>Cancelar</Text>


            </View>
        </View>

    )
}


