import { createContext, useReducer, useState } from "react";
import { ThemeState, lightTheme, themeReducer } from "./themeReducer";

interface ThemeContextProps {
    theme: ThemeState,
    setDarkTheme: () => void
    setLightTheme: () => void,
}


export const ThemeContext = createContext({} as ThemeContextProps)


export const ThemeProvider = ({ children }: any) => {

    const [theme, dispatch] = useReducer(themeReducer, lightTheme)

    const setDarkTheme = () => {
        dispatch({ type: 'set_dark_theme' })
    }

    const setLightTheme = () => {
        dispatch({ type: 'set_light_theme' })
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setDarkTheme,
            setLightTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}