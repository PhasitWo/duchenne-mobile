import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";
import { LanguageProvider } from "@/hooks/useLanguage";
import { AuthProvider } from "./hooks/authContext";
import { ApiProvider } from "./hooks/apiContext";
import { Platform } from "react-native";
import * as Device from "expo-device";
import App from "./app";
import { SafeAreaProvider } from "react-native-safe-area-context";

registerRootComponent(main);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: false,
    }),
});

export default function main() {
    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <ApiProvider>
                    <LanguageProvider>
                        <NavigationContainer>
                            <App />
                        </NavigationContainer>
                    </LanguageProvider>
                </ApiProvider>
            </AuthProvider>
        </SafeAreaProvider>
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
            alert("Require notification permission!");
            return;
        }
    } else {
        alert("Must use physical device for Push Notifications");
    }
}
