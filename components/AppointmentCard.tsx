import { View, Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { darkGrey } from "@/constants/Colors";
import { Dayjs } from "dayjs";
import { useLanguage } from "@/hooks/useLanguage";

export interface appointment {
    id: number | string;
    dateTime: Dayjs;
    doctor: string;
    specialist: string | null;
    approveAt: number | null;
}

export default function AppointmentCard({ appointment, ...rest }: { appointment: appointment } & PressableProps) {
    const { currentLang, lang } = useLanguage();
    const isApprove = appointment.approveAt !== null;
    return (
        <Pressable
            key={appointment.id}
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.container]}
            {...rest}
        >
            <View style={style.statusContainer}>
                <Text style={style.date}>{appointment.dateTime.locale(currentLang).format("D MMMM YYYY")}</Text>
                <Text style={[style.status, { backgroundColor: isApprove ? "lightgreen" : "orange" }]}>
                    {isApprove ? lang("ยืนยันแล้ว", "Approved") : lang("รอยืนยัน", "Pending")}
                </Text>
            </View>
            <Text style={style.time}>{appointment.dateTime.format("HH:mm")}</Text>
            <Text style={style.time}>{appointment.doctor}</Text>
            {appointment.specialist && <Text style={style.time}>{appointment.specialist}</Text>}
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        height: "auto",
        borderBottomWidth: 1,
        borderColor: darkGrey,
        width: "100%",
        padding: "5%",
        borderRadius: 40,
    },
    statusContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        borderRadius: 40,
        paddingLeft: 5,
        paddingRight: 5,
    },
    date: {
        fontWeight: "bold",
    },
    time: {
        color: "black",
    },
});
