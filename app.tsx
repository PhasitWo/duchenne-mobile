import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "@/pages/notification";
import Tabs from "@/pages/tab";
import { useLanguage } from "@/hooks/useLanguage";
import SignupStack from "@/pages/auth/signup/_stack";
import Login from "@/pages/auth/login";
import Header from "@/components/navigation/Header";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "./hooks/authContext";
import AddAsk from "./pages/ask/addAsk";
import Contact from "./pages/auth/contact";
import type { LoginData } from "@/pages/auth/login";
import { useEffect } from "react";

export type AppStackParamList = {
    tab: undefined;
    login: undefined | LoginData;
    contact: undefined;
    signup: undefined;
    notification: undefined;
    addAsk: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

export default function App() {
    const { lang } = useLanguage();
    const { authState } = useAuthContext();

    useEffect(() => {
        if (!authState.isLoading) {
            setTimeout(SplashScreen.hideAsync, 300);
        }
    }, [authState]);

    return (
        <Stack.Navigator
            screenOptions={{
                header: (props) => <Header {...props} showNotification={false} showBackButton={false} />,
            }}
        >
            {authState.userToken === null ? (
                <>
                    <Stack.Screen
                        name="login"
                        component={Login}
                        options={{
                            title: lang("ลงชื่อเข้าใช้", "Login"),
                            header: (props) => (
                                <Header {...props} showNotification={false} showBackButton={false} showLangSwitch />
                            ),
                        }}
                    />
                    <Stack.Screen name="signup" component={SignupStack} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="contact"
                        component={Contact}
                        options={{
                            title: lang("ติดต่อเจ้าหน้าที่", "Contact"),
                            header: (props) => <Header {...props} showNotification={false} />,
                        }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="tab" component={Tabs} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="notification"
                        component={Notification}
                        options={{
                            title: lang("การแจ้งเตือน", "Notifications"),
                            header: (props) => <Header {...props} showNotification={false} />,
                        }}
                    />
                    <Stack.Screen
                        name="addAsk"
                        component={AddAsk}
                        options={{
                            title: lang("ส่งคำถาม", "New Question"),
                            header: (props) => <Header {...props} />,
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
