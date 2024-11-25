import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import { useLanguage } from "@/hooks/useLanguage";
import Signup from "./signup";
import SetPassword from "./setPassword";
import { SignupProvider } from "@/hooks/signupContext";

export type StackParamList = {
    signup: undefined;
    setPassword: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function SignupStack() {
    const { lang } = useLanguage();
    return (
        <SignupProvider>
            <Stack.Navigator
                initialRouteName="signup"
                screenOptions={{
                    title: lang("ลงทะเบียน", "Sign Up"),
                    header: (props) => <Header {...props} showNotification={false} />,
                }}
            >
                <Stack.Screen name="signup" component={Signup} />
                {/* <Stack.Screen name="setPassword" component={SetPassword} /> */}
            </Stack.Navigator>
        </SignupProvider>
    );
}
