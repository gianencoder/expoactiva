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
import { ToastMessageComponent } from '../components/ToastMessageComponent'
import { useNavigation } from '@react-navigation/native'


export const EmailLoginScreen = () => {
    const { theme } = useContext(ThemeContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { getUserByEmail, exist, isChecking, signIn, loading, response, signUp, setIsChecking, setExist, checkit } = EmailLoginFunction()
    const { height } = useWindowDimensions()
    const [toastVisible, setToastVisible] = useState(false)
    const navigation = useNavigation()

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };
    useEffect(() => {

    }, [isChecking, exist])


    const handleFormCancel = () => {
        setIsChecking(true); // Cambia isChecking a true
        setExist(false); // Cambia exist a false
    }

    useEffect(() => {
        if (checkit) {
            setTimeout(() => {
                setToastVisible(true);
            }, 500);
            setTimeout(() => {
                setToastVisible(false);
            }, 3500);
        }
    }, [checkit]);


    return (
        <TouchableWithoutFeedback onPress={closeKeyboard} style={{ backgroundColor: theme.colors.background }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "height" : null}
                keyboardVerticalOffset={height / 10}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}
            >
                <View style={{ ...authStyle.mainView, backgroundColor: theme.colors.background }}>
                    <ToastMessageComponent setTimeout={3500} iconSize={26} width={'90%'} iconColor={'black'} iconName={'warning'} backgroundColor={'#FFE9AE'} textColor={'black'} visible={toastVisible} title={'¡Email no disponible!'} message={'El email está en uso, intenta iniciar sesión'} />


                    {isChecking && <PutEmailToValidateComponent email={email} setEmail={(text) => setEmail(text.toLowerCase())} getUserByEmail={() => getUserByEmail(email)} />}

                    {!isChecking && exist &&
                        <>
                            {
                                loading
                                    ?
                                    <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 0, width: 150, backgroundColor: 'white', borderRadius: 200 }} />
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
                            {loading
                                ?
                                <ActivityIndicator size={'large'} color={theme.customColors.activeColor} style={{ height: 0, width: 150, backgroundColor: 'white', borderRadius: 200 }} />
                                :
                                <LoginFormComponent
                                    name={name}
                                    email={email}
                                    password={password}
                                    setName={text => setName(text)}
                                    setPassword={text => setPassword(text)}
                                    setEmail={text => setEmail(text)}
                                    signUp={() => signUp(name, email, password)}
                                    handleFormCancel={handleFormCancel} />
                            }
                        </>
                    }
                </View>

            </KeyboardAvoidingView >
        </TouchableWithoutFeedback >
    )
}

