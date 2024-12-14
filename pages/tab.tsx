import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import HeaderRight from "@/components/HeaderRight";
import Header from "@/components/navigation/Header";
import Learn from "@/pages/learn";
import AddAppointment from "@/pages/appointment/addAppointment";
import AccountStack from "@/pages/account/_stack";
import AppointmentStack from "@/pages/appointment/_stack";
import AskStack from "@/pages/ask/_stack";
import { useLanguage } from "@/hooks/useLanguage";
import { Platform, Pressable, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const colorScheme = useColorScheme();
    const { lang } = useLanguage();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                tabBarStyle: { height: Platform.OS == "ios" ? 120 : 100 },
                tabBarLabelPosition: "below-icon",
                tabBarLabelStyle: { fontSize: 12, marginTop: 5, width: 100 },
                tabBarButton: (props) => <Pressable {...props} android_ripple={null} />,
                tabBarIconStyle: { width: "auto", height: 50, overflow: "visible", backgroundColor: "red" },
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: { overflow: "visible" },
                animation: "fade",
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
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "bulb" : "bulb-outline"} color={color} />
                    ),
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
                    // unmountOnBlur: true, // force fetching data
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
                        <TabBarIcon name="add-circle-sharp" size={80} color={"#26fbd4"} />
                        /* </Link> */
                    ),
                    // unmountOnBlur: true, // force fetching data
                    tabBarIconStyle: { width: 80, height: 80, transform: "translateY(-25px)" },
                    tabBarLabelStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="ask"
                component={AskStack}
                options={{
                    title: lang("ถามคุณหมอ", "Ask"),
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
                            color={color}
                        />
                    ),
                    // unmountOnBlur: true, // force fetching data
                }}
            />
            <Tab.Screen
                name="Account"
                component={AccountStack}
                options={{
                    title: lang("บัญชี", "Account"),
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
                    ),
                    popToTopOnBlur: true, // Reset to initial route of account stack
                }}
            />
        </Tab.Navigator>
    );
}
