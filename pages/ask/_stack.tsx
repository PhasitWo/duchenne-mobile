import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ask from "./ask";
import ViewAsk from "./viewAsk";
import Header from "@/components/navigation/Header";
import { useTranslation } from "react-i18next";
export type AskStackParamList = {
    index: undefined;
    viewAsk: { id: number };
};

const Stack = createNativeStackNavigator<AskStackParamList>();

export default function AskStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={Ask}
                options={{
                    title: t("ask.title"),
                    header: (props) => <Header {...props} showBackButton={false} />,
                }}
            />
            <Stack.Screen
                name="viewAsk"
                component={ViewAsk}
                options={{
                    title: t("viewAsk.title"),
                    header: (props) => <Header {...props} />,
                }}
            />
        </Stack.Navigator>
    );
}
