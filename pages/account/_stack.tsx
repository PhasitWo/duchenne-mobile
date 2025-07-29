import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "./account";
import Header from "@/components/navigation/Header";
import Profile from "./profile";
import SettingStack from "./setting/_stack";
import { useLanguage } from "@/hooks/useLanguage";
import { color } from "@/constants/Colors";
import Medicine from "./medicine";
import Vaccine from "./vaccine";

export type StackParamList = {
    index: undefined;
    profile: undefined;
    setting: undefined;
    medicine: undefined;
    vaccine: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AccountStack() {
    const { lang } = useLanguage();
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: color.base } }}>
            <Stack.Screen
                name="index"
                component={Account}
                options={{
                    title: lang("บัญชี", "Account"),
                    header: (props) => <Header {...props} showBackButton={false} />,
                }}
            />
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                    title: lang("โปรไฟล์", "Profile"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen
                name="medicine"
                component={Medicine}
                options={{
                    title: lang("ยาประจำตัว", "Prescription Medicine"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen
                name="vaccine"
                component={Vaccine}
                options={{
                    title: lang("ประวัติการฉีดวัคซีน", "Vaccination"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen name="setting" component={SettingStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
