import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useAuthContext } from '../context/AuthContext/AuthContext'
import { userProfileTheme } from '../theme/UserProfileTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { AntDesign } from '@expo/vector-icons';
import { ConfigurationItemComponent } from '../components/ConfigurationItemComponent'
import { SeparatorComponent } from '../components/SeparatorComponent'


export const UserProfileScreen = () => {

    const { user, logout } = useAuthContext()
    const { theme } = useContext(ThemeContext)


    return (

        <View style={{ ...userProfileTheme.container }}>
            <View style={{ ...userProfileTheme.header, backgroundColor: theme.customColors.headerColor }}>
                <Image style={{ ...userProfileTheme.img }} resizeMode='stretch' source={require('../assets/images/perfil.jpeg')} />
                <Text style={userProfileTheme.text}>{user?.name}</Text>
                <Text style={userProfileTheme.text}>{user?.email}</Text>
            </View>

            <View style={{ flex: 2 }}>
                <View style={userProfileTheme.body}>
                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <Image source={require('../assets/icons/editarPerfil.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                            <Text style={{ ...userProfileTheme.text, color: 'black' }}>Editar perfil</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <Image source={require('../assets/icons/cerrar.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                            <Text style={{ ...userProfileTheme.text, color: 'black' }}>Cambiar contraseña</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <TouchableOpacity style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <AntDesign name="lock" size={22} color="black" />
                            <Text style={{ ...userProfileTheme.text, color: 'black' }}>Editar perfil</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />

                    <TouchableOpacity
                        onPress={() => logout()}
                        style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={userProfileTheme.option}>
                            <Image source={require('../assets/icons/salida.png')} style={{ width: 20, height: 20, tintColor: theme.customColors.iconColor }} />
                            <Text style={{ ...userProfileTheme.text, color: 'black' }}>Cerrar sesión</Text>
                        </View>
                        <AntDesign name="right" size={18} color="black" />
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '100%', height: 1 }} />
                </View>


                <View style={{ ...userProfileTheme.footer }}>
                    <Text onPress={() => logout()} style={{ fontWeight: 'bold', fontSize: 15, color: '#DB2D43' }}>Eliminar cuenta</Text>
                </View>
            </View>

        </View>
    )
}
