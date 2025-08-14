import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import Signup1 from "./signup1";
import Signup2 from "./signup2";
import Signup3 from "./signup3";
import { SignupProvider } from "@/hooks/signupContext";
import { LoginData } from "../login";
import Consent from "./consent";
import { useTranslation } from "react-i18next";
import Privacy from "./privacy";

export type SignupStackParamList = {
    index: undefined;
    privacy: undefined;
    signup1: undefined;
    signup2: undefined;
    signup3: undefined;
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
                    name="signup1"
                    component={Signup1}
                    options={{
                        title: t("signup.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
                <Stack.Screen
                    name="signup2"
                    component={Signup2}
                    options={{
                        title: t("signup.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
                <Stack.Screen
                    name="signup3"
                    component={Signup3}
                    options={{
                        title: t("signup.title"),
                        header: (props) => <Header {...props} showNotification={false} />,
                    }}
                />
            </Stack.Navigator>
        </SignupProvider>
    );
}
