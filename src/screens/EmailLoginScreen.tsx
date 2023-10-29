import React, { useContext, useEffect, useState } from 'react'
import {
    View
    , Text
    , TextInput
    , KeyboardAvoidingView
    , Platform
    , Keyboard
    , TouchableWithoutFeedback
    , TouchableOpacity
    , ActivityIndicator,
    ScrollView
    , useWindowDimensions

} from 'react-native'

import { ThemeContext } from '../context/themeContext/ThemeContext'
import { EmailLoginFunction } from '../functions/EmailLoginFunction'
import { PutEmailToValidateComponent } from '../components/PutEmailToValidateComponent'
import { AuthPasswordComponent } from '../components/AuthPasswordComponent'
import { LoginFormComponent } from '../components/LoginFormComponent'
import { authStyle } from '../theme/AuthTheme'


export const EmailLoginScreen = () => {
    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { getUserByEmail, exist, isChecking, signIn, loading, response, signUp, setIsChecking, setExist } = EmailLoginFunction()
    const { height } = useWindowDimensions()
    const closeKeyboard = () => {
        Keyboard.dismiss();
    };
    useEffect(() => {

    }, [isChecking, exist])


    const handleFormCancel = () => {
        setIsChecking(true); // Cambia isChecking a true
        setExist(false); // Cambia exist a false
    }
    return (




        <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : null}
                keyboardVerticalOffset={height / 10}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}
            >
                <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                    {isChecking && <PutEmailToValidateComponent email={email} setEmail={(text) => setEmail(text.toLowerCase())} getUserByEmail={() => getUserByEmail(email)} />}

                    {!isChecking && exist &&
                        <>
                            {
                                loading
                                    ?
                                    <View style={{ alignItems: 'center', height: 'auto', width: '100%', gap: 15, padding: 10 }}>
                                        <ActivityIndicator size={'small'} color={theme.customColors.activeColor} style={{ height: 300, width: '100%' }} />
                                    </View>
                                    :
                                    !response &&
                                    <AuthPasswordComponent
                                        email={email}
                                        password={password}
                                        setPassword={(text) => setPassword(text)}
                                        signIn={() => signIn(email, password)}
                                        handleFormCancel={handleFormCancel} />
                            }
                        </>
                    }

                    {!isChecking && !exist &&
                        <>
                            <LoginFormComponent
                                name={name}
                                email={email}
                                password={password}
                                setName={text => setName(text)}
                                setPassword={text => setPassword(text)}
                                setEmail={text => setEmail(text)}
                                signUp={() => signUp(name, email, password)}
                                handleFormCancel={handleFormCancel} />
                        </>
                    }
                </View>

            </KeyboardAvoidingView >
        </TouchableWithoutFeedback >
    )
}

