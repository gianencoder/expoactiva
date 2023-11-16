import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarLocationContext = createContext();

export const CarLocationProvider = ({ children }) => {
    const [carLocation, setCarLocation] = useState(null);

    const loadSavedCarCoordinates = async () => {
        const savedCoordinates = await AsyncStorage.getItem('savedCarCoordinates');
        if (savedCoordinates) {
            console.log('savedCoordinates on context', savedCoordinates)
            setCarLocation(JSON.parse(savedCoordinates));
        }
    };

    useEffect(() => {
        loadSavedCarCoordinates();
    }, []);
    

    const saveCarLocation = async (location) => {
        await AsyncStorage.setItem('savedCarCoordinates', JSON.stringify(location));
        setCarLocation(location);
    };

    const removeCarLocation = async () => {
        await AsyncStorage.removeItem('savedCarCoordinates');
        setCarLocation(null);
    };

    return (
        <CarLocationContext.Provider value={{ carLocation, saveCarLocation, removeCarLocation, loadSavedCarCoordinates }}>
            {children}
        </CarLocationContext.Provider>
    );
};

export const useCarLocation = () => useContext(CarLocationContext);
