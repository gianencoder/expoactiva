import React, { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeState, lightTheme, themeReducer } from "../themeContext/themeReducer";

interface ThemeContextProps {
    theme: ThemeState;
    setDarkTheme: () => void;
    setLightTheme: () => void;
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    enabled: boolean;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => {
    const [theme, dispatch] = useReducer(themeReducer, lightTheme);
    const [enabled, setEnabled] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        const getStoredTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('darkMode');
                if (storedTheme !== null) {
                    setEnabled(storedTheme === 'true');  // Convertir a booleano
                    setText(storedTheme === 'true' ? 'Desactivar modo oscuro' : 'Activar modo oscuro');
                    dispatch({ type: storedTheme === 'true' ? 'set_dark_theme' : 'set_light_theme' });
                }
            } catch (error) {
                console.error('Error al recuperar el tema desde AsyncStorage:', error);
            }
        };

        getStoredTheme();
    }, []);

    const setDarkTheme = async () => {
        try {
            await AsyncStorage.setItem('darkMode', 'true');
            setText('Desactivar modo oscuro');
            setEnabled(true);
            dispatch({ type: 'set_dark_theme' });
        } catch (error) {
            console.error('Error al establecer el tema oscuro en AsyncStorage:', error);
        }
    };

    const setLightTheme = async () => {
        try {
            await AsyncStorage.setItem('darkMode', 'false');
            setText('Activar modo oscuro');
            setEnabled(false);
            dispatch({ type: 'set_light_theme' });
        } catch (error) {
            console.error('Error al establecer el tema claro en AsyncStorage:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            setDarkTheme,
            setLightTheme,
            enabled,
            setEnabled,
            text,
            setText,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};