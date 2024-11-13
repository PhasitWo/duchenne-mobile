import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import Notification from "@/old-app/notification";

import Tabs from "@/app/tab";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
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
    );
}

registerRootComponent(App);
