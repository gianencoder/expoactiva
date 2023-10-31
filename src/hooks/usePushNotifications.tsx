import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PushNotification {
    expoPushToken: Notifications.ExpoPushToken | undefined | null;
    notification: Notifications.Notification | undefined | null;
    verifyAndRequestPermissions: () => Promise<boolean>;
    verifyPermissions: () => Promise<boolean>;
}

export const  usePushNotifications = (): PushNotification => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken|undefined>();
    const [notification, setNotification] = useState<Notifications.Notification|undefined>();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const verifyAndRequestPermissions = async (): Promise<boolean> => {
        if (!Device.isDevice) {
            console.log("Must use physical device for Push Notifications");
            return false;
        }
        
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus === 'granted';
    };

    const verifyPermissions = async (): Promise<boolean> => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        return existingStatus === 'granted';
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const {
                status: existingStatus,
            } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const {
                    status,
                } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                console.log("Failed to get push token for push notification!");
                const storedToken = await AsyncStorage.getItem('expoPushToken');
                storedToken && await AsyncStorage.removeItem('expoPushToken');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });
        } else {
            console.log("Must use physical device for Push Notifications");
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (token) {
            await AsyncStorage.setItem('expoPushToken', token.data);
        }

        return token;
    }
    
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        notificationListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current!);
            Notifications.removeNotificationSubscription(responseListener.current!);
        }

    }, []);

    return { expoPushToken, notification, verifyAndRequestPermissions, verifyPermissions }
}