import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";


type AuthStateContext = {
    isLoggedIn: boolean;
    visible: boolean;
    user: User[];
    logout: () => void;
    login: (user: User[], token: string) => void;
};

const AuthContext = createContext<AuthStateContext | undefined>(undefined);

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a Auth provider");
    }
    return context;
}

type AuthProviderProps = {
    children: ReactNode;
};


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [visible, setVisible] = useState(false);

    const login = (userData: User[], token: string) => {
        setUser(userData);
        setIsLoggedIn(true);
        setVisible(true)
    };

    useEffect(() => {
        const getPersistEvent = async () => {
            try {
                const data = await AsyncStorage.getItem('UserLoggedIn');
                if (data !== null) {
                    setUser(JSON.parse(data));
                    setIsLoggedIn(true);
                    console.log('Datos cargados desde AsyncStorage');
                }
            } catch (error) {
                console.error('Error al cargar los datos desde AsyncStorage:', error);
                throw new Error('Error al cargar los datos desde AsyncStorage');
            }
        };
        getPersistEvent();
    }, []);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('UserLoggedIn');
            await AsyncStorage.removeItem('AccessToken');
            // Restablecer los valores del estado del contexto
            setUser([]);
            setIsLoggedIn(false);
            setVisible(false)
        } catch (error) {
            console.error('Error al cerrar la sesión:', error);
            throw new Error('Error al cerrar la sesión');
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, visible, user, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}