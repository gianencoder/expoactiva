import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { userProfileTheme } from '../theme/UserProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { AntDesign } from '@expo/vector-icons';
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { confirmation } from '../util/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const UserProfileScreen = () => {

    const { user, logout, token } = useAuthContext()
    const { theme } = useContext(ThemeContext)
    const { deleteAccount, loading } = EmailLoginFunction()


    const showLogoutConfirmation = () => {
        confirmation(
            'Cerrar sesión',
            '¿Seguro deseas cerrar sesión?',
            'Cancelar',
            'Aceptar',
            logout
        )
    };

    const handleDelete = () => {

    }

    const handleDeleteAccount = () => {
        confirmation(
            '¿Seguro deseas eliminar tu cuenta?',
            'Se perderá tu configuración y entradas compradas',
            'Cancelar',
            'Aceptar',
            () => {
                deleteAccount(user?.email, token)

            }
        )

    }


    return (

        <View style={{ ...userProfileTheme.container, backgroundColor: theme.colors.background }}>
            <View style={{ ...userProfileTheme.header, backgroundColor: theme.customColors.headerColor }}>
                {user?.picture
                    ? <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={{ uri: user?.picture }} />
                    : <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={require('../assets/images/perfil.png')} />
                }
                <Text style={userProfileTheme.text}>{user?.name}</Text>
                <Text style={userProfileTheme.text}>{user?.email}</Text>
            </View>

            <View style={{ flex: 2 }}>
                <View style={userProfileTheme.body}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <Image source={require('../assets/icons/editarPerfil.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                            <Text style={{ ...userProfileTheme.text, color: theme.colors.text }}>Editar perfil</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <TouchableOpacity
                        onPress={showLogoutConfirmation}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <Image source={require('../assets/icons/salida.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                            <Text style={{ ...userProfileTheme.text, color: theme.colors.text }}>Cerrar sesión</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />
                </View>


                <View style={{ ...userProfileTheme.footer }}>
                    <Text onPress={handleDeleteAccount} style={{ fontWeight: 'bold', fontSize: 15, color: '#DB2D43' }}>Eliminar cuenta</Text>
                </View>
            </View>

        </View>
    )
}
