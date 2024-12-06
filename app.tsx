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
import ForgotPassword from "./pages/auth/forgotPassword";
import type { LoginData } from "@/pages/auth/login";


export type AppStackParamList = {
    tab: undefined;
    login: undefined | LoginData;
    forgotPassword: undefined;
    signup: undefined;
    notification: undefined;
    addAsk: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function App() {
    const { lang } = useLanguage();
    const { authState } = useAuthContext();
    if (!authState.isLoading) {
        setTimeout(SplashScreen.hideAsync, 300);
    }
    return (
        <Stack.Navigator
            screenOptions={{ header: (props) => <Header {...props} showNotification={false} showBackButton={false} /> }}
        >
            {authState.userToken === null ? (
                <>
                    <Stack.Screen name="login" component={Login} options={{ title: lang("ลงชื่อเข้าใช้", "Login") }} />
                    <Stack.Screen name="signup" component={SignupStack} options={{ headerShown: false }} />
                    <Stack.Screen
                        name="forgotPassword"
                        component={ForgotPassword}
                        options={{
                            title: lang("ลืมรหัสผ่าน", "Forgot Password"),
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
                            title: "Notifications",
                            header: (props) => <Header {...props} showNotification={false} />,
                        }}
                    />
                    <Stack.Screen
                        name="addAsk"
                        component={AddAsk}
                        options={{ title: lang("ส่งคำถาม", "New Question"), header: (props) => <Header {...props} /> }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
