import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./account";
import Header from "@/components/navigation/Header";
import Profile from "./profile";
import SettingStack from "./setting/_stack";
import { color } from "@/constants/Colors";
import Medicine from "./medicine";
import Vaccine from "./vaccine";
import { useTranslation } from "react-i18next";

export type StackParamList = {
    index: undefined;
    profile: undefined;
    setting: undefined;
    medicine: undefined;
    vaccine: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AccountStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: color.base } }}>
            <Stack.Screen
                name="index"
                component={Account}
                options={{
                    title: t("account.title"),
                    header: (props) => <Header {...props} showBackButton={false} />,
                }}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                    title: t("account.menu.profile"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen
                name="medicine"
                component={Medicine}
                options={{
                    title: t("account.menu.medicine"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen
                name="vaccine"
                component={Vaccine}
                options={{
                    title: t("account.menu.vaccine"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen name="setting" component={SettingStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
