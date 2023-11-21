import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator, Linking, useWindowDimensions } from 'react-native'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { userProfileTheme } from '../theme/UserProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { AntDesign } from '@expo/vector-icons';
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { confirmation } from '../util/utils'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';



export const UserProfileScreen = () => {

    const { user, logout, token, image, setImage, setPending, pending } = useAuthContext()
    const { theme } = useContext(ThemeContext)
    const { deleteAccount, loading, updateUserPicture, changingPicture } = EmailLoginFunction()
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions()

    useFocusEffect(
        React.useCallback(() => {
            if (user?.interests !== undefined) {
                if (user?.interests.length > 0) {
                    setPending(false)
                }
            }
            return () => {
            };
        }, [pending])
    );


    const showLogoutConfirmation = () => {
        confirmation(
            'Cerrar sesión',
            '¿Seguro deseas cerrar sesión?',
            'Cancelar',
            'Cerrar sesión',
            logout,
            'cancel'
        )
    };

    const handleDeleteAccount = () => {
        confirmation(
            '¿Seguro deseas eliminar tu cuenta?',
            'Se perderá tu configuración',
            'Cancelar',
            'Eliminar',
            () => deleteAccount(user?.email, token),
            'destructive'
        )
    }

    const uploadImage = async (mode) => {
        try {
            let result = {}
            if (mode == 'gallery') {
                const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (galleryPermission) {
                    result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions
                            .Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1
                    })
                    if (!result.canceled) {
                        await saveImage(result.assets[0].uri)
                    }

                } else {

                    Alert.alert('Sin permiso',
                        "¿Deseas permitir ingresar a tu galería? ",
                        [
                            { text: 'Configuración', onPress: () => Linking.openSettings(), style: 'default' },
                            { text: 'Cancelar' }
                        ]
                    )
                }

            } else {
                const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
                if (cameraPermission) {
                    result = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    })

                    if (!result.canceled) {
                        await saveImage(result.assets[0].uri)
                    }
                } else {
                    Alert.alert('Sin permiso',
                        "¿Deseas permitir ingresar a tu galería? ",
                        [
                            { text: 'Configuración', onPress: () => Linking.openSettings(), style: 'default' },
                            { text: 'Cancelar' }
                        ]
                    )
                }
            }
        } catch (error) {
            Alert.alert('Sin permiso',
                "¿Deseas permitir usar tu cámara? ",
                [
                    { text: 'Configuración', onPress: () => Linking.openSettings(), style: 'default' },
                    { text: 'Cancelar' }
                ]
            )

        }
    }


    const saveImage = async (image) => {
        try {
            await AsyncStorage.setItem("profileImage", JSON.stringify(image))
            setImage(image)
            updateUserPicture(user?.email, image)
        } catch (error) {
            Alert.alert('No está disponible en este momento')
        }
    }

    const options = () => {
        Alert.alert(
            '¿Que desea realizar?',
            '',
            [
                { text: 'Editar foto', onPress: () => handleEditImage(), style: 'default' },
                { text: 'Eliminar foto', onPress: () => optionDeleteImage(), style: 'destructive' },
                { text: 'Cancelar', style: 'cancel' }

            ]
        );
    }

    const handleDeleteImage = async () => {
        try {
            await AsyncStorage.removeItem('profileImage')
            setImage('')
            updateUserPicture(user?.email, '')
        } catch (error) {
            console.log(error)
        }


    }

    const optionDeleteImage = () => {
        Alert.alert(
            'Eliminar imagen de perfil',
            '',
            [
                { text: 'Eliminar', onPress: () => handleDeleteImage(), style: 'destructive' },
                { text: 'Cancelar', style: 'cancel' },


            ]
        );
    }

    const handleEditImage = () => {
        Alert.alert(
            'Selecciona una opción',
            '',
            [
                { text: 'Abrir cámara', onPress: () => uploadImage('camera'), style: 'default' },
                { text: 'Subir desde la galería', onPress: () => uploadImage('gallery'), style: 'default' },
                { text: 'Cancelar', style: 'cancel' },


            ]
        );
    }

    return (
        loading
            ? <View style={{ backgroundColor: theme.colors.background, flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                <ActivityIndicator color={theme.customColors.activeColor} size={'large'} />
            </View>

            : <View style={{ ...userProfileTheme.container, backgroundColor: theme.colors.background }}>

                <View style={{ ...userProfileTheme.header, backgroundColor: theme.customColors.headerColor }}>
                    <View style={{ width: 120, height: 120, justifyContent: 'center' }}>
                        {!changingPicture ?
                            user?.picture
                                ? <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={{ uri: user?.picture }} />
                                :
                                image
                                    ? <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={{ uri: image }} />
                                    : <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={require('../assets/images/perfil.png')} />

                            : <ActivityIndicator size={'large'} color={theme.customColors.activeColor} />
                        }
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 20 }}>
                        <TouchableOpacity
                            onPress={options}
                            style={{ flexDirection: 'row', width: 'auto', borderWidth: 0.5, borderColor: 'white', borderRadius: 5, height: 25, paddingHorizontal: 5, alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: 'white' }}>Editar</Text>
                            <Ionicons name="camera-outline" size={16} color='white' />
                        </TouchableOpacity>


                    </View>
                    <Text style={userProfileTheme.text} numberOfLines={1} >{user?.name}</Text>
                    <Text style={{ ...userProfileTheme.text }} numberOfLines={1}>{user?.email}</Text>


                </View>

                <View style={{ flex: 1 }}>
                    <View style={userProfileTheme.body}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen2')} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={userProfileTheme.option}>
                                <Image source={require('../assets/icons/editarPerfil.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                                <View style={{ flexDirection: 'row', gap: 15 }}>
                                    <Text style={{ ...userProfileTheme.text, color: theme.colors.text, fontFamily: 'verdana', fontSize: 18 }}>Editar perfil</Text>
                                    {user?.interests.length <= 0 || user?.birthDay == null || user.birthDay == '' ? <View style={{ borderRadius: 10, width: 10, height: 10, backgroundColor: 'orange', alignSelf: 'center' }} /> : <View />}
                                </View>

                            </View>
                            <View>
                                <Image style={{ width: width / 30, height: height / 45, tintColor: theme.customColors.iconColor }}
                                    source={require('../assets/icons/right.arrow.png')} />
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={showLogoutConfirmation}
                            style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={userProfileTheme.option}>
                                <Image source={require('../assets/icons/salida.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                                <Text style={{ ...userProfileTheme.text, color: theme.colors.text, fontFamily: 'verdana', fontSize: 18 }}>Cerrar sesión</Text>
                            </View>
                            <View>
                                <Image style={{ width: width / 30, height: height / 45, tintColor: theme.customColors.iconColor }}
                                    source={require('../assets/icons/right.arrow.png')} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ ...userProfileTheme.footer }}>
                        <Text onPress={handleDeleteAccount} style={{ fontWeight: 'bold', fontSize: 18, color: '#DB2D43' }}>Eliminar cuenta</Text>
                    </View>
                </View>

            </View>
    )
}
