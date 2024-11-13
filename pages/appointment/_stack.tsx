import { AppointmentProvider } from "@/hooks/appointmentContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Appointment from "@/pages/appointment/appointment";
import ViewAppointment from "@/pages/appointment/viewAppointment";
export type StackParamList = {
    index: undefined;
    viewAppointment: { id: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function AppointmentStack() {
    return (
        <AppointmentProvider>
            <Stack.Navigator screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="index" component={Appointment}/>
                <Stack.Screen name="viewAppointment" component={ViewAppointment} />
            </Stack.Navigator>
        </AppointmentProvider>
    );
}
