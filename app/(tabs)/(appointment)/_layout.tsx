import { Stack } from "expo-router";
import { AppointmentProvider } from "@/hooks/appointmentContext";
import HeaderLeft from "@/components/HeaderLeft";

export default function AppointmentLayout() {
    return (
        <AppointmentProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    // headerStyle: {
                    //     backgroundColor: "white",
                    // },

                    // headerTitleStyle: {
                    //     fontWeight: "bold",
                    // },
                    // headerTitleAlign: "center",
                    // title: "Appointment",
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen
                    name="viewAppointment"
                />
            </Stack>
        </AppointmentProvider>
    );
}
