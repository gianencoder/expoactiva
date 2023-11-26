import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useExhibitors } from '../hooks/useExhibitors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { usePushNotifications } from '../hooks/usePushNotifications';

export const HomeFunction = () => {
    const exhibitors = useExhibitors();
    const isFocused = useIsFocused();
    const scrollViewRef = useRef<ScrollView>(null);
    const { expoPushToken } = usePushNotifications();

    const getStoredExhibitors = async () => {
        try {
            const storedExhibitors = await AsyncStorage.getItem('@exhibitors');
            return storedExhibitors ? JSON.parse(storedExhibitors) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const storeExhibitors = async (newExhibitors: Exhibitors[]) => {
        try {
            await AsyncStorage.setItem('@exhibitors', JSON.stringify(newExhibitors));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const updateExhibitorsIfNeeded = async () => {
            const storedExhibitors = await getStoredExhibitors();
            if (JSON.stringify(storedExhibitors) !== JSON.stringify(exhibitors)) {
                console.log('Actualizando los expositores en AsyncStorage');
                await storeExhibitors(exhibitors);
            }
        };

        if (exhibitors.length > 0) {
            updateExhibitorsIfNeeded();
        }
    }, [exhibitors]);

    useEffect(() => {
        if (isFocused && scrollViewRef.current) {
            const delay = 50;
            const timeout = setTimeout(() => {
                scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [isFocused]);

    const getLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        return status;
    };

    useEffect(() => {
        getLocationPermission();
    }, []);

    return { scrollViewRef };
}
