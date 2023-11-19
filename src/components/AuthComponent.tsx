/* eslint-disable*/
import React, { useContext, useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, View, Text, Image, Platform, ActivityIndicator, StyleSheet, Modal, Alert } from 'react-native'
import { authStyle } from '../theme/AuthTheme'
import { ThemeContext } from '../context/themeContext/ThemeContext'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"
import properties from '../../properties.json'
import { useAuthContext } from '../context/AuthContext/AuthContext';
import Constants from 'expo-constants';

const webClientId = Constants.expoConfig?.extra?.webClientId;
const iosClientId = Constants.expoConfig?.extra?.iosClientId;

const googleSignInConfigAndroid = {
    scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
    webClientId: webClientId,
};

const googleSignInConfigIos = {
    iosClientId: iosClientId,
};

GoogleSignin.configure(Platform.OS === "android" ? googleSignInConfigAndroid : googleSignInConfigIos);

export const AuthComponent = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const { login } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext)
    const navigation = useNavigation()

    useEffect(() => {

        if (userInfo && userToken) {
            login(userInfo, userToken);
            navigation.navigate('HomeScreen');
        }


    }, [userInfo, userToken]);

    const signIn = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            exchangeGoogleTokenForJWT(userInfo.idToken);

        } catch (error) {
            console.log("Error al iniciar sesión:", error);
        }
    }, []);

    const exchangeGoogleTokenForJWT = useCallback(async (googleToken: any) => {
        try {

            setLoading(true);
            const response = await fetch(`${properties.prod}/auth/google`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tokenId: googleToken,
                    platform: Platform.OS,
                    IOS_CLIENT_ID: googleSignInConfigIos.iosClientId,
                })
            });
            const data = await response.json();


            if (response.status == 400) {
                Alert.alert(`El correo ya existe`, `No se pudo iniciar sesión. ${"\n"} Ya existe un usuario ingresado con ese correo desde otro método de autenticación.`)
            }
            await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.user));
            await AsyncStorage.setItem("AccessToken", JSON.stringify(data.token));
            setUserInfo(data.user);
            setUserToken(data.token);

        } catch (error) {
            console.log("Error al intercambiar el Token de Google por JWT:", error);
        } finally {
            setLoading(false);

        }
    }, []);

    const renderLoadingSpinner = () => {
        return (
            <Modal
                transparent={true}
                animationType="none"
                visible={loading}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={loading}
                            size="large"
                            color={theme.customColors.activeColor}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    const styles = StyleSheet.create({
        modalBackground: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        activityIndicatorWrapper: {
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: 50,
        },
    });

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {renderLoadingSpinner()}
            <View style={{ ...authStyle.formContainer }}>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
                <Text style={{ color: theme.colors.text, fontSize: 16 }}>Inicia sesión o registrate</Text>
                <View style={{ height: 1, width: '10%', backgroundColor: theme.customColors.activeColor, borderRadius: 40 }} />
            </View>

            <View style={{ ...authStyle.buttonContainer }}>
                <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EmailScreen')} style={{ ...authStyle.authComponentForm, borderColor: 'gray' }}>
                        <Image style={authStyle.img} source={require('../assets/icons/email.png')} />
                        <Text style={{ ...authStyle.btnTxt, color: theme.colors.text, fontSize: 17.5, textAlign: 'center' }}>Continuar con correo</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ ...authStyle.loginButton, backgroundColor: theme.colors.background }}>
                    <TouchableOpacity onPress={signIn} style={{ ...authStyle.authComponentForm, borderColor: 'gray' }}>
                        <Image style={authStyle.img} source={require('../assets/icons/googleIcon.png')} />
                        <Text style={{ ...authStyle.btnTxt, color: theme.colors.text, fontSize: 17.5, textAlign: 'center' }}>Continuar con Google</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}
