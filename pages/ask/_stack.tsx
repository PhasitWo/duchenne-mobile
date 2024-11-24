import { AppointmentProvider } from "@/hooks/appointmentContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
import Ask from "./ask";
import AddAsk from "./addAsk";
import Header from "@/components/navigation/Header";
import { useLanguage } from "@/hooks/useLanguage";
export type StackParamList = {
    index: undefined;
    addAsk: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

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
        </Stack.Navigator>
    );
}
