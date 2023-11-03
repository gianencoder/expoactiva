import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthContext/AuthContext';
import properties from '../../properties.json'
import { Button } from 'react-native';
import { ToastMessageComponent } from '../components/ToastMessageComponent';


export const EmailLoginFunction = () => {
    const [exist, setExist] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const navigation = useNavigation()
    const { login } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [credentials, setCredentials] = useState(true)
    const [validAccount, setValidAccount] = useState(true)


    const afterEmailVerification = async (email: string) => {
        try {
            await fetch(`${properties.cyberSoftURL}user/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    validateEmail: true,
                    expirationCode: null,
                    code: null
                }),
            })
                .then(res => {

                })
                .catch(err => {

                })

        } catch (error) {
            throw new Error('Error verificando el email')
        }
    };


    const getUserByEmail = async (email: string) => {

        setLoading(true)

        try {
            const response = await fetch(`${properties.cyberSoftURL}user/get/${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (response.status === 403) {
                setIsChecking(false)
                setExist(false)
                setLoading(false)
            }

            if (response.status === 200) {
                // const data = await response.json();
                setIsChecking(false)
                setExist(true)
                setLoading(false)
            }

            if (response.status === 404) {
                Alert.alert('Error al enviar la solicitud!', 'Intenta nuevamente en unos minutos', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('AuthScreen'),
                    },
                ]);
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            Alert.alert('Error al enviar la solicitud!', 'Intenta nuevamente en unos minutos')
            throw new Error('Error obteniendo el usuario')
        }
    };

    const getCode = async (email: string, code: string) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.cyberSoftURL}user/code?email=${email}&code=${code}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.status === 200) {
                setLoading(false)
                Alert.alert('¡Bien hecho!', 'Has validado tu cuenta', [{
                    text: 'Iniciar sesión',
                    onPress: () => {
                        signIn(email, code, true)
                    }
                },
                {
                    text: 'Ahora no',
                    onPress: () => {
                        navigation.navigate('HomeScreen')
                        afterEmailVerification(email)
                    }
                }
                ])

            } else if (response.status === 400) {
                setLoading(false)
                setIsInvalidCode(true)
            } else if (response.status === 404) {
                setLoading(false)
                Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')
            }
            else {
                setLoading(false)
                Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')
            }
        } catch (error) {
            setLoading(false)
            throw new Error('Error obteniendo el código');
        }
    };

    const signUp = async (name: string, email: string, pswd: string) => {
        setLoading(true);
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

                if (response.status === 201) {
                    setLoading(false);
                    navigation.navigate('CodeValidation', {
                        email: email
                    });
                }
                else if (response.status === 200) {
                    setLoading(false);
                    navigation.navigate('CodeValidation', {
                        email: email
                    });
                    setLoading(false)
                } else {
                    setLoading(false);
                    Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')
                    // setCheckit(true);
                    // await new Promise(resolve => setTimeout(resolve, 3500));
                    // setIsChecking(true);
                }
            })
            .catch(err => {
                setLoading(false);
                Alert.alert('Tiempo agotado', 'Intente nuevamente en unos minutos')
                throw new Error('Error en la consulta', err);
            });
    }

    const signIn = async (email: string, pswd: string, firsTime: boolean) => {
        setLoading(true)
        fetch(`${properties.cyberSoftURL}auth/${firsTime ? 'firstLogin' : 'login'}`, {
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
                        if (data.message === 'firstLogin') afterEmailVerification(email)

                        setResponse(true)
                        login(data.user, data.token);
                        await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.user))
                        await AsyncStorage.setItem("AccessToken", JSON.stringify(data.token))
                        setLoading(false)
                        navigation.navigate('HomeScreen')

                    });
                } else if (response.status === 401) {
                    setLoading(false)
                    setCredentials(false)
                } else if (response.status === 403) {
                    setLoading(false)
                    Alert.alert('¡Falta un paso!', 'Debes validar tu cuenta antes de iniciar sesión',
                        [
                            {
                                text: 'Validar ahora',
                                onPress: () => navigation.navigate('CodeValidation', {
                                    email: email
                                })
                            },
                            {
                                text: 'Ahora no',
                                onPress: () => navigation.navigate('HomeScreen')
                            }
                        ]
                    )
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
            , handleFormCancel
            , setIsChecking
            , setExist
            , getCode
            , afterEmailVerification
            , isInvalidCode
            , setIsInvalidCode
            , validAccount
            , setValidAccount
        }
    )
}
