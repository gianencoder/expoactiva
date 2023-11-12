import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";


type AuthStateContext = {
    isLoggedIn: boolean;
    visible: boolean;
    deletedAccount: boolean;
    user: User[];
    logout: () => void;
    deleteUser: () => void;
    updateUser: (user: User[]) => void;
    login: (user: User[], token: string) => void;
    token: string;
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
    const [token, setToken] = useState('');
    const [deletedAccount, setDeletedAccount] = useState(false)

    const login = (userData: User[], userToken: string) => {
        setUser(userData);
        setIsLoggedIn(true);
        setVisible(true)
        setToken(userToken)
        setDeletedAccount(false)

    };

    useEffect(() => {
        const getPersistEvent = async () => {
            try {
                const data = await AsyncStorage.getItem('UserLoggedIn');
                const token = await AsyncStorage.getItem('AccessToken');

                if (data !== null) {
                    setUser(JSON.parse(data));
                    setIsLoggedIn(true);
                }
                if (token !== null) setToken(JSON.parse(token))
            } catch (error) {
                throw new Error('Error al cargar los datos desde AsyncStorage');
            }
        };
        getPersistEvent();
    }, [isLoggedIn]);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('UserLoggedIn');
            await AsyncStorage.removeItem('AccessToken');
            // Restablecer los valores del estado del contexto
            setUser([]);
            setIsLoggedIn(false);
            setVisible(false)
            setToken('')
        } catch (error) {
            throw new Error('Error al cerrar la sesión');
        }
    }

    const deleteUser = async () => {
        try {
            await AsyncStorage.removeItem('UserLoggedIn');
            await AsyncStorage.removeItem('AccessToken');
            // Restablecer los valores del estado del contexto
            setUser([]);
            setIsLoggedIn(false);
            setVisible(false)
            setDeletedAccount(true)
        } catch (error) {
            throw new Error('Error al cerrar la sesión');
        }
    }

    const updateUser = async (userData: User[]) => {
        try {
            setUser(userData);
        } catch (error) {
            throw new Error('Error al cerrar la sesión');
        }
    }

    return (
        <AuthContext.Provider value={{ updateUser, isLoggedIn, visible, user, logout, login, token, deleteUser, deletedAccount }}>
            {children}
        </AuthContext.Provider>
    );
}