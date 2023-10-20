import { Theme } from '@react-navigation/native'
import { Platform } from 'react-native'
import { MyColors } from '../../theme/ColorsTheme'


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
        iconColor: string,
        shadow: string,
        activeColor: string,
        headerColor: string,
        subtitles: string,

    }
}

export const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: MyColors.primary,
        background: 'white',
        card: 'orange',
        text: 'black',
        border: 'grey',
        notification: 'black',


    },
    customColors: {
        transparent: Platform.OS === 'android' ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.90)',
        littleComponentBg: 'white',
        littleComponentIcon: MyColors.primary,
        bottomTabIcon: 'black',
        iconColor: 'black',
        shadow: 'black',
        activeColor: MyColors.primary,
        headerColor: MyColors.primary,
        subtitles: MyColors.textGrey
    }
}

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: MyColors.primary,
        background: '#1b1b1b',
        card: 'orange',
        text: 'white',
        border: 'grey',
        notification: 'black',
    },
    customColors: {
        transparent: Platform.OS === 'android' ? 'rgba(27,27,27,0.95)' : 'rgba(27,27,27,0.95)',
        littleComponentBg: '#1d1d1d',
        littleComponentIcon: '#03ffbb',
        bottomTabIcon: 'white',
        iconColor: '#03ffbb',
        shadow: 'white',
        activeColor: '#03ffbb',
        headerColor: '#1b1b1b',
        subtitles: MyColors.textGrey

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