import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
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
    const [response, setResponse] = useState(false)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [isExpiredCode, setIsExpiredCode] = useState(false)
    const [validAccount, setValidAccount] = useState(true)
    const [isPendingCode, setIsPendingCode] = useState(false)
    const [isCodeResend, setIsCodeResend] = useState(false)
    const [wrongCredentials, setWrongCredentials] = useState(false)



    // const afterEmailVerification = async (email: string) => {
    //     try {
    //         await fetch(`${properties.ambienteDesarrollo}user/update/${email}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 validateEmail: true,
    //                 expirationCode: null,
    //                 code: null
    //             }),
    //         })
    //             .then(res => {

    //             })
    //             .catch(err => {

    //             })

    //     } catch (error) {
    //         throw new Error('Error verificando el email')
    //     }
    // };


    const getUserByEmail = async (email: string) => {

        setLoading(true)

        try {
            const response = await fetch(`${properties.ambienteDesarrollo}user/get/${email}`, {
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
                setLoading(false);
                resendCode(email)
                navigation.navigate('CodeValidation', {
                    email: email
                });
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
            const response = await fetch(`${properties.ambienteDesarrollo}user/code?email=${email}&code=${code}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.status === 200) {
                setLoading(false)
                signIn(email, code, true)
                navigation.navigate('HomeScreen')

            } else if (response.status === 400) {
                setLoading(false)
                setIsInvalidCode(true)
            } else if (response.status === 404) {
                setLoading(false)
                Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')
            }
            else if (response.status === 403) {
                setLoading(false)
                setIsExpiredCode(true)
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

    const signUp = async (name: string, email: string, bornDay: Date) => {
        setLoading(true);
        fetch(`${properties.ambienteDesarrollo}user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                birthDay: bornDay,
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

                } else {
                    setLoading(false);
                    Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')

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

        try {
            const response = await fetch(`${properties.ambienteDesarrollo}auth/${firsTime ? 'firstLogin' : 'login'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: pswd,
                }),
            });
            if (response.status === 200) {
                return response.json().then(async data => {
                    // if (data.message === 'firstLogin') afterEmailVerification(email)
                    setResponse(true)
                    console.log('usuaruio', data.user)
                    console.log('token', data.token)
                    login(data.user);
                    await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.user))
                    await AsyncStorage.setItem("AccessToken", JSON.stringify(data.token))
                    setLoading(false)
                    navigation.navigate('HomeScreen')

                });
            } else if (response.status === 401) {
                setWrongCredentials(true)
                setLoading(false)
                console.log(wrongCredentials)
            } else if (response.status === 403) {
                setLoading(false)
                Alert.alert('¡Falta un paso!', 'Debes validar tu cuenta antes de iniciar sesión',
                    [
                        {
                            text: 'Validar ahora',
                            onPress: () => {
                                resendCode(email)
                                navigation.navigate('CodeValidation', {
                                    email: email
                                })
                            }
                        },
                        {
                            text: 'Ahora no',
                            onPress: () => navigation.navigate('HomeScreen')
                        }
                    ]
                )
            }
        } catch (error) {
            Alert.alert('Error en la solicitud', 'Vuelve a intentarlo mas tarde')
            throw new Error('Error en la solicitud')
        }
    }

    const resendCode = async (email: string) => {
        setLoading(true)
        fetch(`${properties.ambienteDesarrollo}user/code/update/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {

                if (response.status === 200) { console.log('el codigo es valido'), setIsPendingCode(true) }

                if (response.status === 201) { console.log('Codigo reenviado'), setIsCodeResend(true) }

                if (response.status === 403) console.log('Codigo reenviado pero el email no se pudo enviar')

                if (response.status === 404) console.log('El usuario no fué encontrado',)

                if (response.status === 500) console.log('Error en el servidor')

                setLoading(false)
            })
            .catch(err => {
                Alert.alert('Hubo un error en la solicitud', 'Intente más tarde')
                setLoading(true)
            })
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
            // , afterEmailVerification
            , isInvalidCode
            , setIsInvalidCode
            , validAccount
            , setValidAccount
            , isExpiredCode
            , setIsExpiredCode
            , resendCode
            , isPendingCode
            , setIsPendingCode
            , isCodeResend
            , setIsCodeResend
            , wrongCredentials
            , setWrongCredentials
        }
    )
}
