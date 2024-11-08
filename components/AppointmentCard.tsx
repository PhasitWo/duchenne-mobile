import { View, Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { grey, darkGrey } from "@/constants/Colors";
import { Dayjs } from "dayjs";

export interface appointment {
    id: number
    dateTime: Dayjs;
    doctor: string;
}

export default function AppointmentCard({
    appointment,
    ...rest
}: { appointment: appointment } & PressableProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? darkGrey : "white" },
                style.container,
            ]}
            {...rest}
        >
            <Text style={style.date}>{appointment.dateTime.format("D MMMM YYYY")}</Text>
            <Text style={style.time}>{appointment.dateTime.format("HH:mm")}</Text>
            <Text style={style.time}>{appointment.doctor}</Text>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        height: 100,
        borderBottomWidth: 1,
        borderColor: darkGrey,
        width: "100%",
        padding: "5%",

        borderRadius: 40,
    },
    date: {
        fontWeight: "bold",
    },
    time: {
        color: "black",
    },
});
