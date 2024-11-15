import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import Setting from "./setting";
import Language from "./language";
import { useLanguage } from "@/hooks/useLanguage";

export type StackParamList = {
    index: undefined;
    language: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function SettingStack() {
    const { lang } = useLanguage();
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen
                name="index"
                component={Setting}
                options={{ title: lang("การตั้งค่า", "Setting"), header: (props) => <Header {...props} /> }}
            />
            <Stack.Screen
                name="language"
                component={Language}
                options={{ title: lang("เลือกภาษา", "Select Language"), header: (props) => <Header {...props} /> }}
            />
        </Stack.Navigator>
    );
}
