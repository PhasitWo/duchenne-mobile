import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import Setting from "./setting";
import Language from "./language";
import { color } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export type StackParamList = {
    index: undefined;
    language: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function SettingStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: color.base } }}>
            <Stack.Screen
                name="index"
                component={Setting}
                options={{
                    title: t("setting.title"),
                    header: (props) => <Header {...props} />,
                }}
            />
            <Stack.Screen
                name="language"
                component={Language}
                options={{
                    title: t("language.title"),
                    header: (props) => <Header {...props} />,
                }}
            />
        </Stack.Navigator>
    );
}
