import * as Notifications from "expo-notifications";

export const checkNotificationPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    return existingStatus === 'granted';
};
