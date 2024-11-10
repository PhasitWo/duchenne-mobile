import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }} initialRouteName="/(learn)">
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="notification"
                options={{ headerShown: true, title: "Notifications" }}
            />
        </Stack>
    );
}
