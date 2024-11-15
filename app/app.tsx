import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import Notification from "@/pages/notification"
import * as Notifications from "expo-notifications";
import type { NotificationTrigger } from "expo-notifications";
import Tabs from "@/app/tab";
import { AndroidNotificationPriority } from "expo-notifications";
import { LanguageProvider } from "@/hooks/useLanguage";

registerRootComponent(App);
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        priority: AndroidNotificationPriority.MAX
    }),
});

const Stack = createNativeStackNavigator();
type notificationReceiveTrigger = NotificationTrigger & {value:number}

export default function App() {
    useEffect(() => {
        registerForPushNotificationsAsync();
        const subscription = Notifications.addNotificationReceivedListener((notification) => {
            const trigger = notification.request.trigger as notificationReceiveTrigger
            console.log(notification.request.identifier)
            console.log(trigger.value)
        });
        return () => subscription.remove();
    }, []);
    return (
        <LanguageProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="tab" component={Tabs} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="notification"
                        component={Notification}
                        options={{ headerShown: true, title: "Notifications" }}
                    />
                </Stack.Navigator>
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
