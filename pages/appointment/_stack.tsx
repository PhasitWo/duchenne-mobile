import { AppointmentProvider } from "@/hooks/appointmentContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
import HeaderRight from "@/components/HeaderRight";
import Header from "@/components/navigation/Header";
export type StackParamList = {
    index: undefined;
    viewAppointment: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppointmentStack() {
    return (
        <AppointmentProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="index"
                    component={Appointment}
                    options={{
                        title: "Appointment",
                        header: (props) => <Header {...props} showBackButton={false} />,
                    }}
                />
                <Stack.Screen
                    name="viewAppointment"
                    component={ViewAppointment}
                    options={{ title: "Appointment", header: (props) => <Header {...props} /> }}
                />
            </Stack.Navigator>
        </AppointmentProvider>
    );
}
