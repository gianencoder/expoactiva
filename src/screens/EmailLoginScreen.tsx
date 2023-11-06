import React, { useContext, useEffect, useState } from 'react'
import {
    View
    , Text
    , KeyboardAvoidingView
    , Platform
    , Keyboard
    , TouchableWithoutFeedback
    , ActivityIndicator
    , useWindowDimensions
} from 'react-native'

import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { PutEmailToValidateComponent } from '../components/PutEmailToValidateComponent'
import { AuthPasswordComponent } from '../components/AuthPasswordComponent'
import { LoginFormComponent } from '../components/LoginFormComponent'
import { authStyle } from '../theme/AuthTheme'
import { ToastMessageComponent } from '../components/ToastMessageComponent'


const data = [
    { label: 'Agricultura', value: 'Agricultura' },
    { label: 'Automóviles', value: 'Automóviles' },
    { label: 'Ganadería', value: 'Ganadería' },
    { label: 'Lacteos', value: 'Lacteos' },
    { label: 'Máquinas', value: 'Máquinas' },
    { label: 'Tecnología', value: 'Tecnología' },
];

export const EmailLoginScreen = () => {
    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('')
    const [bornDay, setBornDay] = useState(new Date())
    const [name, setName] = useState('')
    const { getUserByEmail, exist, isChecking, signIn, loading, response, signUp, setIsChecking, setExist, wrongCredentials, setWrongCredentials } = EmailLoginFunction()
    const { height } = useWindowDimensions()
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (wrongCredentials) {
            setTimeout(() => {
                setWrongCredentials(false)
            }, 3000)
        }
    }, [wrongCredentials])

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleFormCancel = () => {
        setIsChecking(true); // Cambia isChecking a true
        setExist(false); // Cambia exist a false
    }

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : null}
                keyboardVerticalOffset={height / 10}
                style={{ flex: 1, backgroundColor: theme.colors.background }}
            >
                {loading
                    ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 100, backgroundColor: theme.colors.background, borderRadius: 200 }} />
                        <Text style={{ fontSize: 18, color: 'gray' }}>Obteniendo información. Por favor, espere...</Text>
                    </View>

                    : <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                        <ToastMessageComponent
                            iconName={'closecircleo'}
                            textColor={theme.customColors.colorErrorMessage}
                            iconColor={theme.customColors.colorErrorMessage}
                            iconSize={24}
                            backgroundColor={theme.customColors.bgErrorMessage}
                            visible={wrongCredentials}
                            title={'¡Error!'}
                            message={'Credenciales incorrectas'}
                            width={'90%'}
                        />

                        {isChecking && <PutEmailToValidateComponent email={email} setEmail={(text) => setEmail(text.toLowerCase())} getUserByEmail={() => getUserByEmail(email)} />}

                        {/* {!isChecking && exist &&
                            <>
                                {
                                    !response &&
                                    <AuthPasswordComponent
                                        email={email}
                                        password={password}
                                        setPassword={(text) => setPassword(text)}
                                        signIn={() => signIn(email, password, false)}
                                        handleFormCancel={handleFormCancel} />
                                }
                            </>
                        } */}

                        {!isChecking && !exist &&
                            <LoginFormComponent
                                name={name}
                                email={email}
                                bornDay={bornDay}
                                setName={text => setName(text)}
                                setBornDay={text => setBornDay(text)}
                                setEmail={text => setEmail(text)}
                                signUp={() => signUp(name, email, bornDay, selected)}
                                handleFormCancel={handleFormCancel} selected={selected} data={data} onChange={item => {
                                    setSelected(item)
                                }} />
                        }
                    </View>
                }
            </KeyboardAvoidingView >
        </TouchableWithoutFeedback >
    )
}

