import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "@/constants/Colors";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import HeaderRight from "@/components/HeaderRight";
import Header from "@/components/navigation/Header";
import AddAppointment from "@/pages/appointment/addAppointment";
import AccountStack from "@/pages/account/_stack";
import AppointmentStack from "@/pages/appointment/_stack";
import AskStack from "@/pages/ask/_stack";
import { Platform, Pressable, View } from "react-native";
import ContentStack from "./content/_stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { smFontSize } from "@/constants/Style";

const Tab = createBottomTabNavigator();

export default function Tabs() {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: color.tint,
                tabBarStyle: { height: Platform.OS == "ios" ? 120 : insets.bottom + 80 },
                tabBarLabelPosition: "below-icon",
                tabBarAllowFontScaling: false,
                tabBarLabelStyle: { fontSize: smFontSize, marginTop: 5, width: 100 },
                tabBarButton: ({ ref, ...props }) => (
                    <Pressable ref={ref as React.RefObject<View>} {...props} android_ripple={null} />
                ),
                tabBarIconStyle: {
                    width: "auto",
                    height: 50,
                    overflow: "visible",
                    backgroundColor: "red",
                },
                tabBarHideOnKeyboard: true,
                tabBarItemStyle: { overflow: "visible" },
                animation: "fade",
                headerRight: () => <HeaderRight />,
                header: (props) => <Header {...props} showBackButton={false} />,
            }}
        >
            <Tab.Screen
                name="content"
                component={ContentStack}
                options={{
                    title: t("content.title"),
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? "bulb" : "bulb-outline"} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="appointment"
                component={AppointmentStack}
                options={{
                    title: t("appointment.title"),
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
                    title: t("addAppointment.title"),
                    headerShown: true,
                    tabBarIcon: () => (
                        // <Link
                        //     href="/(tabs)/addAppointment"
                        //     style={{ transform: "translateY(-20px)" }}
                        // >
                        <TabBarIcon name="add-circle-sharp" size={80} color={color.tint} />
                        /* </Link> */
                    ),
                    // unmountOnBlur: true, // force fetching data
                    tabBarIconStyle: {
                        width: 80,
                        height: 80,
                        transform: "translateY(-25px)",
                    },
                    tabBarLabelStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="ask"
                component={AskStack}
                options={{
                    title: t("ask.title"),
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
                    title: t("account.title"),
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
