import { Theme } from '@react-navigation/native'
import { Platform } from 'react-native'


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }



export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string,
    customColors: {
        transparent: string,
        littleComponentBg: string,
        littleComponentIcon: string,
        bottomTabIcon: string,

    }
}

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#00624e',
        background: 'white',
        card: 'orange',
        text: 'green',
        border: 'grey',
        notification: 'black'
    },
    customColors: {
        transparent: Platform.OS === 'android' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
        littleComponentBg: 'white',
        littleComponentIcon: '#00654a',
        bottomTabIcon: 'black'
    }
}

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#00624e',
        background: 'black',
        card: 'orange',
        text: '#00624e',
        border: 'grey',
        notification: 'black',
    },
    customColors: {
        transparent: Platform.OS === 'android' ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.5)',
        littleComponentBg: '#00654a',
        littleComponentIcon: 'black',
        bottomTabIcon: 'white'

    }
}



export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {

    switch (action.type) {
        case 'set_light_theme':
            return { ...lightTheme }
        case 'set_dark_theme':
            return { ...darkTheme }
        default:
            return state;
    }
}