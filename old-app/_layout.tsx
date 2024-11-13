import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});


async function registerForPushNotificationsAsync() {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
}

export default function RootLayout() {
    useEffect(() => {
        registerForPushNotificationsAsync();
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification)
        })
        return () => subscription.remove()
    }, [])
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="notification"
                options={{ headerShown: true, title: "Notifications" }}
            />
        </Stack>
    );
}
