import { AppointmentProvider } from "@/hooks/appointmentContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
import Header from "@/components/navigation/Header";
import { useTranslation } from "react-i18next";
export type StackParamList = {
    index: undefined;
    viewAppointment: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppointmentStack() {
    const { t } = useTranslation();
    return (
        <AppointmentProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={Appointment}
                    options={{
                        title: t("appointment.title"),
                        header: (props) => <Header {...props} showBackButton={false} />,
                    }}
                />
                <Stack.Screen
                    name="viewAppointment"
                    component={ViewAppointment}
                    options={{
                        title: t("appointment.title"),
                        header: (props) => <Header {...props} />,
                        
                    }}
                />
            </Stack.Navigator>
        </AppointmentProvider>
    );
}
