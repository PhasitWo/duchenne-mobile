import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
import Header from "@/components/navigation/Header";
import { useLanguage } from "@/hooks/useLanguage";
import Content from "./content";
import ViewContent from "./viewContent";
export type ContentStackParamList = {
    index: undefined;
    viewContent: { id: string };
};

const Stack = createNativeStackNavigator<ContentStackParamList>();

export default function ContentStack() {
    const { lang } = useLanguage();
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={Content}
                    options={{
                        title: lang("ศูนย์เรียนรู้", "Learn"),
                        header: (props) => <Header {...props} showBackButton={false} />,
                    }}
                />
                <Stack.Screen
                    name="viewContent"
                    component={ViewContent}
                    options={{ title: lang("ศูนย์เรียนรู้", "Learn"), header: (props) => <Header {...props} /> }}
                />
            </Stack.Navigator>
    );
}
