import React, { useContext, useEffect, useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { ThemeContext } from '../context/themeContext/ThemeContext';
import { visibilityTheme } from '../theme/VisibilityTheme';
import { SeparatorComponent } from '../components/SeparatorComponent';



export const VisibilityScreen = () => {
    const { setDarkTheme, setLightTheme, theme } = useContext(ThemeContext)
    const [enabled, setEnabled] = useState(false)
    const [text, setText] = useState('')

    const toggleSwitch = () => {
        setEnabled((previousState) => !previousState)
    }

    useEffect(() => {
        if (enabled) {
            setDarkTheme()
            setText('Desactivar modo oscuro')
        } else {
            setLightTheme()
            setText('Activar modo oscuro')
        }
    }, [enabled])

    return (
        <View style={{ flex: 1, paddingVertical: 30 }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ ...visibilityTheme.text, color: theme.colors.text }}>
                    {text}
                </Text>
                <Switch
                    trackColor={{ false: 'grey', true: theme.customColors.activeColor }}
                    thumbColor={'white'}
                    ios_backgroundColor={'grey'}
                    onValueChange={toggleSwitch}
                    value={enabled}
                />
            </View>

        </View>

    )
}
