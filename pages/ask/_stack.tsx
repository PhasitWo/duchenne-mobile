import { AppointmentProvider } from "@/hooks/appointmentContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
import Ask from "./ask";
import ViewAsk from "./viewAsk";
import Header from "@/components/navigation/Header";
import { useLanguage } from "@/hooks/useLanguage";
export type AskStackParamList = {
    index: undefined;
    viewAsk: { id: number };
};

const Stack = createNativeStackNavigator<AskStackParamList>();

export default function AskStack() {
    const { lang } = useLanguage();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="index"
                component={Ask}
                options={{
                    title: lang("ถามคุณหมอ", "Ask"),
                    header: (props) => <Header {...props} showBackButton={false} />,
                }}
            />
            <Stack.Screen
                name="viewAsk"
                component={ViewAsk}
                options={{
                    title: lang("คำถามของคุณ", "Your Question"),
                    header: (props) => <Header {...props} />,
                }}
            />
        </Stack.Navigator>
    );
}
