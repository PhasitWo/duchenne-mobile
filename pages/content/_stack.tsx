import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "@/components/navigation/Header";
import Content from "./content";
import ViewContent from "./viewContent";
import { useTranslation } from "react-i18next";
export type ContentStackParamList = {
    index: undefined;
    viewContent: { id: string };
};

const Stack = createNativeStackNavigator<ContentStackParamList>();

export default function ContentStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={Content}
                options={{
                    title: t("content.title"),
                    header: (props) => <Header {...props} showBackButton={false} />,
                }}
            />
            <Stack.Screen
                name="viewContent"
                component={ViewContent}
                options={{
                    title: t("content.title"),
                    header: (props) => <Header {...props} />,
                }}
            />
        </Stack.Navigator>
    );
}
