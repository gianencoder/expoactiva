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
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [response, setResponse] = useState(false)
    const [checkit, setCheckit] = useState(false)


    const getUserByEmail = async (email: string) => {
        try {
            const response = await fetch(`${properties.cyberSoftURL}user/${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (!response.ok) {
                setIsChecking(false)
                setExist(false)
            } else {
                const data = await response.json();
                setIsChecking(false)
                setExist(true)
            }
        } catch (error) {
            console.log(error);
        }
    };


    const signUp = async (name: string, email: string, pswd: string) => {
        setLoading(true)
        fetch(`${properties.cyberSoftURL}user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: pswd,
            }),
        })
            .then(async response => {
                if (response.status === 200) {
                    setLoading(false)
                    navigation.navigate('CodeValidation')

                }

                if (response.status === 400) {
                    setLoading(false);
                    setCheckit(true);
                    await new Promise(resolve => setTimeout(resolve, 3500));
                    setIsChecking(true);

                }


            })
            .catch(err => {
                throw new Error(err)
            })
    }

    const signIn = async (email: string, pswd: string) => {
        setLoading(true)
        fetch(`${properties.cyberSoftURL}auth/login`, {
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
                        setLoading(false)
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

    function handleFormCancel() {
        setIsChecking(true)
        setExist(false)
    }
    return (
        {
            getUserByEmail
            , exist
            , isChecking
            , signIn
            , signUp
            , loading
            , response
            , checkit
            , adding
            , handleFormCancel
            , setIsChecking
            , setExist

        }
    )
}
