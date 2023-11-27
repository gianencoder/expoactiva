// LanguageContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageAction = { type: 'set_language'; payload: string };

export interface LanguageState {
    language: string;
}

const LanguageContext = createContext<{
    languageState: LanguageState;
    dispatchLanguage: React.Dispatch<LanguageAction>;
} | undefined>(undefined);

const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
    switch (action.type) {
        case 'set_language':
            return { ...state, language: action.payload };
        default:
            return state;
    }
};

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [languageState, dispatchLanguage] = useReducer(languageReducer, { language: 'es' });

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('language');
                if (storedLanguage !== null) {
                    dispatchLanguage({ type: 'set_language', payload: storedLanguage });
                }
            } catch (error) {
                console.log('Error fetching language from AsyncStorage:', error);
            }
        };

        fetchLanguage();
    }, []);

    return (
        <LanguageContext.Provider value={{ languageState, dispatchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export { LanguageProvider };
