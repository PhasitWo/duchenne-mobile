import { View, StyleSheet, Pressable, PressableProps } from "react-native";
import { darkGrey } from "@/constants/Colors";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import CustomText from "./CustomText";

export interface appointment {
    id: number | string;
    dateTime: Dayjs;
    doctor: string;
    specialist: string | null;
    approveAt: number | null;
}

export default function AppointmentCard({ appointment, ...rest }: { appointment: appointment } & PressableProps) {
    const { t } = useTranslation();
    const isApprove = appointment.approveAt !== null;
    return (
        <Pressable
            key={appointment.id}
            style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.container]}
            {...rest}
        >
            <View style={style.statusContainer}>
                <CustomText style={style.date}>{appointment.dateTime.format("D MMMM YYYY")}</CustomText>
                <CustomText style={[style.status, { backgroundColor: isApprove ? "lightgreen" : "orange" }]}>
                    {isApprove ? t("appointmentCard.approved") : t("appointmentCard.pending")}
                </CustomText>
            </View>
            <CustomText style={style.time}>{appointment.dateTime.format("HH:mm")}</CustomText>
            <CustomText style={style.time}>{appointment.doctor}</CustomText>
            {appointment.specialist && <CustomText style={style.time}>{appointment.specialist}</CustomText>}
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
