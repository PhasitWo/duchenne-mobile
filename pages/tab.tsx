import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import HeaderRight from "@/components/HeaderRight";
import HeaderLeft from "@/components/HeaderLeft";
import Header from "@/components/navigation/Header";
import Learn from "@/pages/learn";
import AddAppointment from "@/pages/appointment/addAppointment";
import AccountStack from "@/pages/account/_stack";
import Ask from "@/pages/ask";
import AppointmentStack from "@/pages/appointment/_stack";
import { useLanguage } from "@/hooks/useLanguage";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const colorScheme = useColorScheme();
    const { lang } = useLanguage();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarStyle: { height: "10%" },
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: { fontSize: 12, paddingBottom: 10 },
                // headerStyle: {
                //     backgroundColor: "white",
                // },

                // headerTitleStyle: {
                //     fontWeight: "bold",
                // },
                // headerTitleAlign: "center",
                headerRight: () => <HeaderRight />,
                header: (props) => <Header {...props} showBackButton={false} />,
            }}
        >
            <Tab.Screen
                name="learn"
                component={Learn}
                options={{
                    title: lang("ศูนย์เรียนรู้", "Learn"),
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "bulb" : "bulb-outline"} color={color} />,
                }}
            />
            <Tab.Screen
                name="appointment"
                component={AppointmentStack}
                options={{
                    title: lang("การนัดหมาย", "Appointment"),
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "calendar" : "calendar-outline"} color={color} />
                    ),
                    // lazy: false, // render the screen on initial render
                }}
            />
            <Tab.Screen
                name="addAppointment"
                component={AddAppointment}
                options={{
                    title: lang("เพิ่มนัดหมาย", "Add Appointment"),
                    headerShown: true,
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

                    tabBarLabelStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="ask"
                component={Ask}
                options={{
                    title: lang("ถามคุณหมอ", "Ask"),
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountStack}
                options={{
                    title: lang("บัญชี", "Account"),
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />,
                    unmountOnBlur: true, // Reset to initial route of account stack
                }}
            />
        </Tab.Navigator>
    );
}
