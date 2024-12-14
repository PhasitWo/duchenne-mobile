import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import * as Device from "expo-device";

export async function getExpoToken(): Promise<string | null> {
    let token = null;
    try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        if (!projectId) {
            throw new Error("Project ID not found");
        }
        token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } catch (e: any) {
        Alert.alert(e.message);
    }
    return token;
}

export function getDeviceName() {
    return Device.deviceName ? Device.deviceName : "Unknown Device";
}