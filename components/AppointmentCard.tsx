import { View, Text, StyleSheet } from "react-native";
import { grey, darkGrey } from "@/constants/Colors";

export interface appointment {
    date: string;
    time: string;
    doctor: string;
    status: "incoming" | "history";
}

export default function AppointmentCard({ appointment }: { appointment: appointment }) {
    return (
        <View style={style.container}>
            <Text style={style.date}>{appointment.date}</Text>
            <Text style={style.time}>{appointment.time}</Text>
            <Text style={style.time}>{appointment.doctor}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        height: "20%",
        padding: "5%",
        paddingLeft: "10%",
        borderBottomWidth: 1,
        borderColor: darkGrey,
        width: "100%",
    },
    date: {
        fontWeight: "bold",
    },
    time: {
        color: "black",
    },
});
