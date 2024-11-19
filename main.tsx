import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import * as Notifications from "expo-notifications";
import type { NotificationTrigger } from "expo-notifications";
import { LanguageProvider } from "@/hooks/useLanguage";
import App from "./app";

registerRootComponent(main);

type notificationReceiveTrigger = NotificationTrigger & { value: number };

export default function main() {
    useEffect(() => {
        registerForPushNotificationsAsync();
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            const trigger = notification.request.trigger as notificationReceiveTrigger;
            console.log(notification.request.identifier);
            console.log(trigger.value);
        });
        return () => subscription.remove();
    }, []);
    return (
        <LanguageProvider>
            <NavigationContainer>
                <App />
            </NavigationContainer>
        </LanguageProvider>
    );
}

async function registerForPushNotificationsAsync() {
    await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
    });
}
