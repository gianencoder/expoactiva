import * as Notifications from "expo-notifications";

export const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
};
