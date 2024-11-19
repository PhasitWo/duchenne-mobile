import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "@/pages/notification";
import Tabs from "@/pages/tab";
import {  useLanguage } from "@/hooks/useLanguage";
import SignupStack from "@/pages/auth/signup/_stack";
import Login from "@/pages/auth/login";
import Header from "@/components/navigation/Header";

type StackParamList = {
    tab: undefined;
    login: undefined;
    register: undefined;
    notification: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
    const { lang } = useLanguage();
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ header: (props) => <Header {...props} showNotification={false} showBackButton={false} /> }}
        >
            <Stack.Screen name="tab" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={Login} options={{ title: lang("ลงชื่อเข้าใช้", "Login") }} />
            <Stack.Screen name="register" component={SignupStack} options={{ headerShown: false }} />
            <Stack.Screen name="notification" component={Notification} options={{ headerShown: true, title: "Notifications" }} />
        </Stack.Navigator>
    );
}
