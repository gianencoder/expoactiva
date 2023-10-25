import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthContext/AuthContext';
import properties from '../../properties.json'

export const EmailLoginFunction = () => {
    const [exist, setExist] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const navigation = useNavigation()
    const { login } = useAuthContext();
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false)


    const getUserByEmail = async (email: string) => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/user/${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!response.ok) {
                setIsChecking(false)
                setExist(false)
                console.log('ya chequee y no existe')
            } else {
                const data = await response.json();
                setIsChecking(false)
                setExist(true)
                console.log('ya chequee y existe')
            }

        } catch (error) {
            console.log(error);
        }
    };

    const signIn = async (email: string, pswd: string) => {
        setLoading(true)
        fetch('http://192.168.1.6:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: pswd,
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json().then(async data => {
                        setResponse(true)
                        login(data.user, data.token);
                        await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.user))
                        await AsyncStorage.setItem("AccessToken", JSON.stringify(data.token))
                        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                        await delay(3000)
                        setLoading(false)
                        setVisible(true)
                        await delay(1500)
                        setVisible(false)
                        await delay(300)
                        navigation.navigate('HomeScreen')



                    });
                } else if (response.status === 401) {
                    setLoading(false)
                    Alert.alert("Contraseña incorrecta",
                        "Por favor, vuelva a intentar",
                        [{ text: "Aceptar" }])
                } else {
                    throw new Error('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
                }
            })
            .catch(error => {
                throw new Error('Error al iniciar sesión:', error);

            });
    }


    return (
        {
            getUserByEmail
            , exist
            , isChecking
            , signIn
            , visible
            , loading
            , response

        }
    )
}
