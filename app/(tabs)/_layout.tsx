import { Tabs, Link, useSegments } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderRight from "@/components/HeaderRight";
import HeaderLeft from "@/components/HeaderLeft";
import { Text } from "react-native";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const segment = useSegments();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: true,
                tabBarStyle: { height: "10%" },
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: { fontSize: 13, paddingBottom: 10 },
                headerStyle: {
                    backgroundColor: "white",
                },

                headerTitleStyle: {
                    fontWeight: "bold",
                },
                headerTitleAlign: "center",
                headerRight: () => <HeaderRight />,
            }}
        >
            <Tabs.Screen
                
                name="index"
                options={{
                    title: "Learn",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "bulb" : "bulb-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="(appointment)"
                options={{
                    title: "Appointment",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "calendar" : "calendar-outline"}
                            color={color}
                        />
                    ),
                    unmountOnBlur: true, // Reset to initial state
                    headerLeft: () => <HeaderLeft />,
                }}
            />
            <Tabs.Screen
                name="addAppointment"
                options={{
                    title: "Add Appointment",
                    tabBarButton: () => (
                        <Link
                            href="/(tabs)/addAppointment"
                            style={{ transform: "translateY(-20px)" }}
                        >
                            <TabBarIcon name="add-circle-sharp" size={80} color={"#26fbd4"} />
                        </Link>
                    ),
                    unmountOnBlur: true, // Reset to initial state
                    headerLeft: () => <HeaderLeft />,
                    headerLeftContainerStyle: { paddingLeft: "5%" },
                }}
            />
            <Tabs.Screen
                name="assessment"
                options={{
                    title: "Assessment",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "document-text" : "document-text-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ask"
                options={{
                    title: "Ask",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
