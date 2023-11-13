import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../context/AuthContext/AuthContext';
import properties from '../../properties.json'
import axios from 'axios';



export const EmailLoginFunction = () => {
    const [exist, setExist] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const navigation = useNavigation()
    const { login, deleteUser, token, updateUser } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false)
    const [isInvalidCode, setIsInvalidCode] = useState(false)
    const [isExpiredCode, setIsExpiredCode] = useState(false)
    const [validAccount, setValidAccount] = useState(true)
    const [isPendingCode, setIsPendingCode] = useState(false)
    const [isCodeResend, setIsCodeResend] = useState(false)
    const [wrongCredentials, setWrongCredentials] = useState(false)
    const [updated, setUpdated] = useState(false)

    // const afterEmailVerification = async (email: string) => {
    //     try {
    //         await fetch(`${properties.prod}user/update/${email}`, {
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

    const editUser = async (email: string, name: string, interests: []) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}user/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    interests: interests
                }),
            })


            if (response.status === 200) {
                return response.json().then(async data => {
                    await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.updatedUser));
                    updateUser(data.updatedUser)
                    setLoading(false)
                    setUpdated(true)

                })
                    .catch(err => {
                        Alert.alert('Error en su solicitud', 'Intente nuevamente en unos minutos', [
                            {
                                text: 'Aceptar',
                                onPress: () => navigation.navigate('AuthScreen'),
                            },
                        ]);
                    })

            }

            if (response.status === 404) {
                console.log('Usuario no editado')
                setLoading(false)
                Alert.alert('Error 404', ' El usuario no se pudo editar con éxito', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('AuthScreen'),
                    },
                ]);
            }

            if (response.status === 403) {
                setLoading(false)
                Alert.alert('Error 403', 'Error en token de validacion', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('AuthScreen'),
                    },
                ]);
            }

            if (response.status === 500) {
                setLoading(false)
                Alert.alert('Error 500', 'Error interno en el servidor', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('AuthScreen'),
                    },
                ]);

            }
            else {
                console.log(response)
            }


        } catch (error) {
            console.log('Error en la solicitud')
        }
    };


    const getUserByEmail = async (email: string) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}user/get/${email}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            if (response.status === 403) {
                navigation.navigate('LoginFormScreen', {
                    email: email
                });
                setLoading(false)
            }

            if (response.status === 200) {
                setLoading(false);
                resendCode(email)
                navigation.navigate('CodeValidation', {
                    email: email
                });
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
            Alert.alert('Error al enviar la solicitud!', 'Intenta nuevamente en unos minutos', [
                {
                    text: 'Aceptar',
                    onPress: () => navigation.navigate('AuthScreen'),
                },
            ]);
            throw new Error('Error obteniendo el usuario')
        }
    };

    const getCode = async (email: string, code: string) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}user/code?email=${email}&code=${code}`, {
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

    const signUp = async (name: string, email: string, date: Date, interests: string[]) => {
        setLoading(true);

        try {
            const request = await fetch(`${properties.prod}user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    birthDay: date,
                    interests: interests
                }),
            });
            if (request.status === 201) {
                setLoading(false);
                navigation.navigate('CodeValidation', {
                    email: email
                });
            }
            else if (request.status === 200) {
                setLoading(false);
                navigation.navigate('CodeValidation', {
                    email: email
                });

            } else {
                setLoading(false);
                Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos')

            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Tiempo agotado', 'Intente nuevamente en unos minutos')
            throw new Error('Error en la consulta');
        }

    }

    const signIn = async (email: string, pswd: string, firsTime: boolean) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}auth/${firsTime ? 'firstLogin' : 'login'}`, {
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
                    setResponse(true)
                    login(data.user, data.token);
                    await AsyncStorage.setItem("UserLoggedIn", JSON.stringify(data.user))
                    await AsyncStorage.setItem("AccessToken", JSON.stringify(data.token))
                    setLoading(false)
                    navigation.navigate('HomeScreen')

                });
            } else if (response.status === 401) {
                setWrongCredentials(true)
                setLoading(false)
                console.log(wrongCredentials)
            } else if (response.status === 402) {
                setLoading(false)
                Alert.alert('Error en su solicitud', 'Vuelve a intentar en unos momentos',
                    [{
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('HomeScreen')
                    }])
            }

        } catch (error) {
            setLoading(false)
            Alert.alert('Error en la solicitud', 'Vuelve a intentarlo mas tarde',
                [{
                    text: 'Aceptar',
                    onPress: () => navigation.navigate('HomeScreen')
                }])
            throw new Error('Error en la solicitud')
        }
    }

    const resendCode = async (email: string) => {
        setLoading(true)
        try {
            const response = await fetch(`${properties.prod}user/code/update/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.status === 200) { console.log('el codigo es valido'), setIsPendingCode(true) }

            if (response.status === 201) { console.log('Codigo reenviado'), setIsCodeResend(true) }

            if (response.status === 403) console.log('Codigo reenviado pero el email no se pudo enviar')

            if (response.status === 404) console.log('El usuario no fué encontrado',)

            if (response.status === 500) console.log('Error en el servidor')

        } catch (error) {
            Alert.alert('Hubo un error en la solicitud', 'Intente más tarde', [
                {
                    text: 'Aceptar',
                    onPress: () => navigation.navigate('AuthScreen'),
                },
            ]);

            setLoading(true)
        }
    }

    function handleFormCancel() {
        setIsChecking(true)
        setExist(false)
    }

    const deleteAccount = async (email: string, token: string) => {
        setLoading(true)

        try {
            const response = await fetch(`${properties.prod}user/delete/${email}`, {
                method: 'DELETE',
                headers: {

                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 204) {
                deleteUser()
                setLoading(false)
                navigation.navigate('HomeScreen')
            }

            if (response.status === 400) {
                setLoading(false)
                Alert.alert('Error 403', ' No estás autorizado a realizar esta acción', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('HomeScreen'),
                    },
                ]);
            }

            if (response.status === 404) {
                setLoading(false)
                Alert.alert('Error 404', ' Error en la solicitud', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('HomeScreen'),
                    },
                ]);

            }

            if (response.status === 405) {
                setLoading(false)
                Alert.alert('Error 405', ' Usuario no encontrado', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('HomeScreen'),
                    },
                ]);
            }

            if (response.status === 500) {

                setLoading(false)
                Alert.alert('Error 500', ' Error interno en el servidor', [
                    {
                        text: 'Aceptar',
                        onPress: () => navigation.navigate('HomeScreen'),
                    },
                ]);
            }

        } catch (error) {

            setLoading(false);
            Alert.alert('Error', 'Error en la solicitud, vuelva a intentarlo en unos minutos', [
                {
                    text: 'Aceptar',
                    onPress: () => navigation.navigate('HomeScreen'),
                },
            ]);
        }
    };

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
            , deleteAccount
            , editUser
            , updated
        }
    )
}
