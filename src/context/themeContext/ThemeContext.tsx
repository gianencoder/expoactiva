import React, { createContext, useReducer, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeState, lightTheme, themeReducer } from "../themeContext/themeReducer";
import { MainScreen } from "../../screens/MainScreen";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { loadTranslations, translations } from "../../util/utils";

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
    const [isReady, setIsReady] = useState(false);
    const { languageState } = useLanguage();
    const [translation, setTranslation] = useState(translations.es);
    useEffect(() => {
        loadTranslations(setTranslation);
    }, [languageState]);

    useEffect(() => {
        const getStoredTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('darkMode');
                if (storedTheme !== null) {
                    setEnabled(storedTheme === 'true');
                    setText(storedTheme === 'true' ? translation.visibilityScree.desactivarModoOscuro : translation.visibilityScree.activarModoOscuro);
                    dispatch({ type: storedTheme === 'true' ? 'set_dark_theme' : 'set_light_theme' });
                } else {
                    // Si no hay un tema almacenado, establece el tema por defecto (claro)
                    setLightTheme();
                }

                // Indica que la promesa se ha resuelto y la aplicación está lista para mostrarse
                setIsReady(true);
            } catch (error) {
                console.log('Error al recuperar el tema desde AsyncStorage:', error);
            }
        };

        getStoredTheme();
    }, []);

    const setDarkTheme = async () => {
        try {
            await AsyncStorage.setItem('darkMode', 'true');
            setText(translation.visibilityScree.desactivarModoOscuro);
            setEnabled(true);
            dispatch({ type: 'set_dark_theme' });
        } catch (error) {
            console.log('Error al establecer el tema oscuro en AsyncStorage:', error);
        }
    };

    const setLightTheme = async () => {
        try {
            await AsyncStorage.setItem('darkMode', 'false');
            setText(translation.visibilityScree.activarModoOscuro);
            setEnabled(false);
            dispatch({ type: 'set_light_theme' });
        } catch (error) {
            console.log('Error al establecer el tema claro en AsyncStorage:', error);
        }
    };

    // Renderiza el contenido de la aplicación solo cuando la promesa se ha resuelto
    if (!isReady) {
        return <MainScreen />;
    }

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
