import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";
import type { NotificationTrigger } from "expo-notifications";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AuthProvider } from "./hooks/authContext";
import { ApiProvider } from "./hooks/apiContext";
import { Platform } from "react-native";
import * as Device from "expo-device";
import App from "./app";
import Constants from "expo-constants";
type notificationReceiveTrigger = NotificationTrigger & { value: number };

registerRootComponent(main);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function main() {
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);
    return (
        <AuthProvider>
            <ApiProvider>
                <LanguageProvider>
                    <NavigationContainer>
                        <App />
                    </NavigationContainer>
                </LanguageProvider>
            </ApiProvider>
        </AuthProvider>
    );
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        let token;
        try {
            const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) {
                throw new Error("Project ID not found");
            }
            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        } catch (e) {
            token = `${e}`;
        }
    } else {
        alert("Must use physical device for Push Notifications");
    }
}
