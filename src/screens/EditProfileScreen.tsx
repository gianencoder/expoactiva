import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { editProfileTheme } from '../theme/EditProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { authStyle } from '../theme/AuthTheme'
import * as ImagePicker from 'expo-image-picker';
import { MultiSelectComponent } from '../components/MultiSelectComponent'
import { useFocusEffect } from '@react-navigation/native';
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { data } from '../util/utils'



export const EditProfileScreen = () => {
    const navigation = useNavigation()
    const { editUser, loading, updated } = EmailLoginFunction()
    const { theme: { colors, customColors, currentTheme } } = useContext(ThemeContext)
    const { user } = useAuthContext()
    const [name, setName] = useState('')
    const [image, setImage] = useState(null);
    const [selected, setSelected] = useState([]);
    const [showToast, setShowToast] = useState(false)


    const handleUpdateUser = (email: string, name: string, selected: []) => {
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

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if (status !== 'granted') {
    //             alert('Se requieren permisos para acceder a la biblioteca de imágenes.');
    //         }
    //     })();
    // }, []);


    return (
        <View style={{ ...editProfileTheme.container, backgroundColor: colors.background }}>
            <ToastMessageComponent
                width={'100%'}
                visible={showToast}
                title={'¡Bien hecho!'}
                message={'Usuario guardado con éxito'}
                backgroundColor={customColors.bgSuccesMessage}
                iconColor={customColors.colorSuccessMessage}
                textColor={customColors.colorSuccessMessage}
            />

            <View style={{ width: '100%', height: 100, justifyContent: 'center' }}>
                <Text style={{ ...editProfileTheme.title, color: colors.text }}>Editar perfil</Text>
            </View>

            <View style={editProfileTheme.div}>
                <Text style={{ ...editProfileTheme.labelName, color: colors.text }}>Nombre y Apellido</Text>
                <TextInput
                    clearButtonMode='while-editing'
                    maxLength={50}
                    keyboardType='default'
                    value={name}
                    onChangeText={text => setName(text)}
                    style={{ ...authStyle.ef, color: colors.text, backgroundColor: currentTheme === 'light' ? '#e8e8e8' : '#272727' }}
                    placeholder='Nombre y Apellido' placeholderTextColor={'gray'} />
            </View>

            <MultiSelectComponent
                onChange={item => {
                    setSelected(item)
                }}
                data={data} selected={selected} />


            <View style={editProfileTheme.div}>
                {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
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


