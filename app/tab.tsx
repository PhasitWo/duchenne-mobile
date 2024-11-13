import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import HeaderRight from "@/components/HeaderRight";
import HeaderLeft from "@/components/HeaderLeft";
import Learn from "@/pages/learn";
import Appointment from "@/pages/appointment/appointment";
import AddAppointment from "@/pages/appointment/addAppointment";
import Assessment from "@/pages/assessment";
import Ask from "@/pages/ask";
import AppointmentStack from "@/pages/appointment/stack";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
               
                tabBarStyle: { height: "10%" },
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: { fontSize: 12, paddingBottom: 10 },
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
            <Tab.Screen
                name="learn"
                component={Learn}
                options={{
                    title: "Learn",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "bulb" : "bulb-outline"} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="appointment"
                component={AppointmentStack}
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
            <Tab.Screen
                name="addAppointment"
                component={AddAppointment}
                options={{
                    title: "Add Appointment",
                    tabBarIcon: () => (
                        // <Link
                        //     href="/(tabs)/addAppointment"
                        //     style={{ transform: "translateY(-20px)" }}
                        // >
                        <TabBarIcon
                            name="add-circle-sharp"
                            size={80}
                            color={"#26fbd4"}
                            style={{ transform: "translateY(-25px)" }}
                        />
                        /* </Link> */
                    ),
                    unmountOnBlur: true, // Reset to initial state
                    headerLeft: () => <HeaderLeft />,
                    tabBarLabelStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="assessment"
                component={Assessment}
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
            <Tab.Screen
                name="ask"
                component={Ask}
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
        </Tab.Navigator>
    );
}
