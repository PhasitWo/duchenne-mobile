import { Text, View, ScrollView, StyleSheet, Pressable, RefreshControl } from "react-native";
import { useState, useMemo, useCallback } from "react";
import Calendar from "@/components/Calendar";
import AppointmentCard from "@/components/AppointmentCard";
import { grey, darkGrey } from "@/constants/Colors";
import dayjs from "dayjs";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import { StackParamList } from "./_stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLanguage } from "@/hooks/useLanguage";
import LoadingView from "@/components/LoadingView";
import { useFocusEffect } from "@react-navigation/native";

type props = NativeStackScreenProps<StackParamList, "index">;

export default function Appointment({ navigation }: props) {
    const [incomingSelected, setIncomingSelected] = useState(true);
    const { apmntList, isLoading, fetch } = useAppointmentContext();
    const { lang } = useLanguage();
    const now = dayjs();
    // fetch data on focus
    useFocusEffect(
        useCallback(() => {
            fetch();
        }, [])
    );
    // compute calendar component data ,normalize to dayOfMonth:00:00:00
    const markedDateKey = useMemo<number[]>(() => {
        let res = [];

        const normalizedNow = dayjs().hour(0).minute(0).second(0);
        for (let apmt of apmntList) {
            if (apmt.dateTime.isBefore(normalizedNow)) continue;
            let diff = apmt.dateTime.hour(0).minute(0).second(0).diff(normalizedNow, "day", true);
            res.push(Math.ceil(diff));
        }
        return res;
    }, [apmntList]);
    // scrollview children
    const display = useMemo<React.JSX.Element[]>(() => {
        return apmntList
            .filter((v) => (incomingSelected ? v.dateTime.isAfter(now) : v.dateTime.isBefore(now)))
            .map((v, k) => (
                <AppointmentCard
                    key={k}
                    appointment={v}
                    onPress={() => incomingSelected && navigation.navigate("viewAppointment", { id: String(v.id) })}
                />
            ));
    }, [apmntList, incomingSelected]);

    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Calendar markedDateKey={markedDateKey} />
            <View style={style.headContainer}>
                <Pressable
                    style={[{ backgroundColor: incomingSelected ? darkGrey : grey }, style.head]}
                    onPress={() => setIncomingSelected(true)}
                >
                    <View>
                        <Text>{lang("กำลังมาถึง", "Incoming")}</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[{ backgroundColor: !incomingSelected ? darkGrey : grey }, style.head]}
                    onPress={() => setIncomingSelected(false)}
                >
                    <View>
                        <Text>{lang("ประวัติ", "History")}</Text>
                    </View>
                </Pressable>
            </View>
            <View style={style.bodyBackground}>
                <ScrollView
                    style={style.bodyContainer}
                    contentContainerStyle={style.bodyContentContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
                >
                    {display.length > 0 ? display : <Text>{lang("ไม่มีนัดหมาย", "No Appointment")}</Text>}
                </ScrollView>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    headContainer: {
        backgroundColor: "white",
        width: "90%",
        height: 80,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    head: {
        width: "42%",
        height: 55,
        borderRadius: 100,
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    bodyBackground: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: "90%",
        height: "72%",
        backgroundColor: "white",
        padding: "3%",
        marginTop: 10,
    },
    bodyContainer: {
        width: "100%",
        overflow: "hidden",
        borderRadius: 40,
    },
    bodyContentContainer: {
        overflow: "hidden",
        alignItems: "center",
    },
});
