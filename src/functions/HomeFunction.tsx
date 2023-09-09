import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

export const HomeFunction = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const isFocused = useIsFocused(); //Se esta mostrando la pantalla?
    useEffect(() => {
        //Si la pantalla se esta mostrando y si existe una referencia al scrollView
        if (isFocused && scrollViewRef.current) {

            const delay = 50;
            const timeout = setTimeout(() => {
                scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [isFocused]);
    return (
        {
            scrollViewRef,
        }
    )
}
