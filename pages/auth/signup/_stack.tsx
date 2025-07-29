import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import { useLanguage } from "@/hooks/useLanguage";
import Signup from "./signup";
import { SignupProvider } from "@/hooks/signupContext";
import { LoginData } from "../login";

export type SignupStackParamList = {
    index: undefined;
    setPassword: undefined;
    login: LoginData;
};

const Stack = createNativeStackNavigator<SignupStackParamList>();

export default function SignupStack() {
    const { lang } = useLanguage();
    return (
        <SignupProvider>
            <Stack.Navigator
                screenOptions={{
                    title: lang("ลงทะเบียน", "Sign Up"),
                    header: (props) => <Header {...props} showNotification={false} />,
                }}
            >
                <Stack.Screen name="index" component={Signup} />
                {/* <Stack.Screen name="setPassword" component={SetPassword} /> */}
            </Stack.Navigator>
        </SignupProvider>
    );
}
