import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "@/pages/notification";
import Tabs from "@/pages/tab";
import { useLanguage } from "@/hooks/useLanguage";
import SignupStack from "@/pages/auth/signup/_stack";
import Login from "@/pages/auth/login";
import Header from "@/components/navigation/Header";
import * as SplashScreen from "expo-splash-screen";
import { useAuthContext } from "./hooks/authContext";

type StackParamList = {
    tab: undefined;
    login: undefined;
    register: undefined;
    notification: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
    const { lang } = useLanguage();
    const { authState } = useAuthContext();

    if (!authState.isLoading) {
        setTimeout(SplashScreen.hideAsync, 1000)
    }
    return (
        <Stack.Navigator
            screenOptions={{ header: (props) => <Header {...props} showNotification={false} showBackButton={false} /> }}
        >
            {authState.userToken === null ? (
                <>
                    <Stack.Screen name="login" component={Login} options={{ title: lang("ลงชื่อเข้าใช้", "Login") }} />
                    <Stack.Screen name="register" component={SignupStack} options={{ headerShown: false }} />
                </>
            ) : (
                <>
                    <Stack.Screen name="tab" component={Tabs} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="notification"
                        component={Notification}
                        options={{ headerShown: true, title: "Notifications" }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
