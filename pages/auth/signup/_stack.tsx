import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import Signup from "./signup";
import { SignupProvider } from "@/hooks/signupContext";
import { LoginData } from "../login";
import Consent from "./consent";
import { useTranslation } from "react-i18next";
import Privacy from "./privacy";

export type SignupStackParamList = {
    index: undefined;
    privacy: undefined;
    signup: undefined;
    login: LoginData;
};

const Stack = createNativeStackNavigator<SignupStackParamList>();

export default function SignupStack() {
    const { t } = useTranslation();
    return (
        <SignupProvider>
            <Stack.Navigator screenOptions={{}}>
                <Stack.Screen
                    name="index"
                    component={Consent}
                    options={{
                        title: t("consent.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
                <Stack.Screen
                    name="privacy"
                    component={Privacy}
                    options={{
                        title: t("privacy.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
                <Stack.Screen
                    name="signup"
                    component={Signup}
                    options={{
                        title: t("signup.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
            </Stack.Navigator>
        </SignupProvider>
    );
}
