import { usePushNotifications } from '../hooks/usePushNotifications';

const NotificationHandler = () => {
    const { expoPushToken } = usePushNotifications();

    console.log('expoPushToken', expoPushToken);
    return null;
};

export default NotificationHandler;
