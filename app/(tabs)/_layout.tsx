import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSegments } from "expo-router";
import { Button, Text } from "react-native";
import HeaderRight from "@/components/HeaderRight";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const segment = useSegments();
    const page = segment[segment.length - 1]

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: true,
                tabBarStyle: { height: "10%" },
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: { fontSize: 13, paddingBottom: 10 },
                headerStyle: {
                    backgroundColor: "",
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
                name="appointment"
                options={{
                    title: "Appointment",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "calendar" : "calendar-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="button"
                options={{
                    tabBarButton: () => (
                        <TabBarIcon
                            name="add-circle-sharp"
                            size={80}
                            color={"#26fbd4"}
                            style={{ transform: "translateY(-20px)" }}
                        />
                    ),
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
