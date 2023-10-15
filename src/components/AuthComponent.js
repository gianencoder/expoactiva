/* eslint-disable*/
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { ScrollView, TouchableOpacity, View, Text, Image, Platform } from 'react-native'
import { authStyle } from '../theme/AuthTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

const googleSignInConfigAndroid = {
    scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
    webClientId: "808320141330-lrmcjul62fdcg5drvqfpepdbtd8gai79.apps.googleusercontent.com",
};

const googleSignInConfigIos = {
    iosClientId: "808320141330-gnmt0lf7aqh6d5kns4hb2b69eerkm9qp.apps.googleusercontent.com",
};

GoogleSignin.configure(Platform.OS === "android" ? googleSignInConfigAndroid : googleSignInConfigIos);

export const AuthComponent = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserFromStorage = async () => {
            if (!userInfo) {
                const storedUser = await AsyncStorage.getItem("@user");
                if (storedUser) {
                    setUserInfo(JSON.parse(storedUser));
                }
            }
        };
        fetchUserFromStorage();
    }, [userInfo]);

    const signIn = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            exchangeGoogleTokenForJWT(userInfo.idToken);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }, []);

    const exchangeGoogleTokenForJWT = useCallback(async (googleToken) => {
        try {
            console.log('googleToken',googleToken);
            const response = await fetch("https://expoactiva-nacional-395522.rj.r.appspot.com/auth/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tokenId: googleToken,
                    platform: Platform.OS
                })
            });
            const data = await response.json();
            await AsyncStorage.setItem("@token", data.token);
            await AsyncStorage.setItem("@user", JSON.stringify(data.user));

            console.log('user',data.user);
            console.log('tokenJWT',data.token);

            setUserInfo(data.user);
        } catch (error) {
            console.error("Error al intercambiar el Token de Google por JWT:", error);
        }
    }, []);

    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ ...authStyle.formContainer }}>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
                <Text style={{ color: theme.colors.text }}>Inicia sesión o registrate</Text>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
            </View>
            <ScrollView style={{ backgroundColor: theme.colors.background }}
            >
                <View style={{ ...authStyle.buttonContainer }}>
                    <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                        <TouchableOpacity style={{ ...authStyle.authComponentForm, borderColor: theme.colors.border }}>
                            <Image style={authStyle.img} source={require('../assets/icons/email.png')} />
                            <Text style={{ ...authStyle.btnTxt, color: theme.colors.text }}>Continuar con correo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                        <TouchableOpacity onPress={signIn} style={{ ...authStyle.authComponentForm, borderColor: theme.colors.border }}>
                            <Image style={authStyle.img} source={require('../assets/icons/googleIcon.png')} />
                            <Text style={{ ...authStyle.btnTxt, color: theme.colors.text }}>Continuar con google</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}
