import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Button, AsyncStorage } from 'react-native';
import { authStyles } from '../theme/AuthTheme';
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

// WEB 813213253742-8kchdd054p8u9dhlq7kgllc3mst8sgjj.apps.googleusercontent.com
// IOS 813213253742-kgoipi1j3egt0ekd34oh4notj9dtk0qk.apps.googleusercontent.com
// ANDROID 813213253742-t23sutlmdj8ap60kas1cpqpo7i940m6b.apps.googleusercontent.com


WebBrowser.maybeCompleteAuthSession()

export const AuthScreen = () => {

    const [userInfo, setUserInfo] = useState('')
    const [accesToken, setAccessToken] = useState('')
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '813213253742-svi0b5mrd7epk3l22l0l60dua36ts06q.apps.googleusercontent.com',
        androidClientId: "813213253742-t23sutlmdj8ap60kas1cpqpo7i940m6b.apps.googleusercontent.com",
        iosClientId: "813213253742-kgoipi1j3egt0ekd34oh4notj9dtk0qk.apps.googleusercontent.com",
        webClientId: "813213253742-8kchdd054p8u9dhlq7kgllc3mst8sgjj.apps.googleusercontent.com"

    },
        {
            projectNameForProxy: "@mendozagian/expoactiva-nacional"
        })

    useEffect(() => {
        handleSingInWithGoogle()
    }, [response])


    const handleSingInWithGoogle = async () => {
        const user = await AsyncStorage.getItem("@user")
        if (!user) {
            if (response?.type === 'success') {
                await getUserInfor(response!.authentication?.accessToken!)
                console.log(JSON.stringify(user, null, 2))
            }
        } else {
            setUserInfo(JSON.parse(user))
            console.log(JSON.stringify(user, null, 2))
        }
    }

    const getUserInfor = async (token: string) => {
        if (!token) return;
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` }
            })

            const user = await response.json()
            await AsyncStorage.setItem("@user", JSON.stringify(user, null, 2))
            setUserInfo(user)
            console.log(JSON.stringify(user, null, 2))
        } catch (err) {


        }

    }


    return (
        <View style={authStyles.container}>

            <View style={authStyles.buttonsContainer}>
                <Text style={authStyles.titleTxt}>Abrir con</Text>
                <TouchableOpacity style={authStyles.googleBtn}
                    onPress={() => promptAsync()}
                >
                    <Image style={{ width: 24, height: 24 }} source={require('../assets/googleIcon.png')} />
                    <Text style={authStyles.googleTxt}>Continuar con Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={authStyles.appleBtn}>
                    <Image style={{ width: 30, height: 30 }} source={require('../assets/appleIcon.png')} />
                    <Text style={authStyles.txtBtn}>Continuar con Apple</Text>
                </TouchableOpacity>

                <TouchableOpacity style={authStyles.facebookBtn}>
                    <Image style={{ width: 30, height: 30 }} source={require('../assets/facebookIcon.png')} />
                    <Text style={authStyles.txtBtn}>Continuar con Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
