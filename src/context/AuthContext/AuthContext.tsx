import { createContext } from "react";

//Definir que informacion tendra mi contexto
export interface AuthState {
    isLoggedIn: boolean;
    username?: string;
    favouritIcon?: string;
}

//Estado inicial
export const authInitialState: AuthState = {
    isLoggedIn: false,
}

//Le decimos a react que expone el contexto
export interface AuthContextProps {
    authState: AuthState;
    signIn: () => void;
}

//Aca es donde creamos el contexto
export const AuthCOntext = createContext({



})