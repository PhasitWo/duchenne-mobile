import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import AppointmentCard from "@/components/AppointmentCard";
import { type appointment } from "@/components/AppointmentCard";
import { grey, darkGrey } from "@/constants/Colors";
import dayjs from "dayjs";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { StackParamList } from "./_stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// mockup fetching data
const mockup: Array<appointment> = [
    {
        id: 1,
        dateTime: dayjs("2024-11-08 23:30"),
        doctor: "Dr.Earth Bindai",
    },
    {
        id: 2,
        dateTime: dayjs("2024-11-09 22:30"),
        doctor: "Dr.Earth Bindai",
    },
    {
        id: 3,
        dateTime: dayjs("2024-11-16 22:30"),
        doctor: "Dr.Spiderman",
    },
];

type props = NativeStackScreenProps<StackParamList, "index">;

export default function Appointment({ navigation }: props) {
    const [incomingSelected, setIncomingSelected] = useState(true);
    const { apmntList, setApmtList } = useAppointmentContext();
  
    let markedDateKey = [];
    // normalize to dayOfMonth:00:00:00
    const now = dayjs();
    const normalizedNow = dayjs().hour(0).minute(0).second(0);
    for (let apmt of mockup) {
        if (apmt.dateTime.isBefore(normalizedNow)) continue;
        let diff = apmt.dateTime.hour(0).minute(0).second(0).diff(normalizedNow, "day", true);
        // if apmt is less than 24 hour -> check if it's today
        markedDateKey.push(Math.ceil(diff));
    }

    useEffect(() => {
        setApmtList(mockup);
    }, []);

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
                        <Text>Incoming</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[{ backgroundColor: !incomingSelected ? darkGrey : grey }, style.head]}
                    onPress={() => setIncomingSelected(false)}
                >
                    <View>
                        <Text>History</Text>
                    </View>
                </Pressable>
            </View>
            <View style={style.bodyBackground}>
                <ScrollView
                    style={style.bodyContainer}
                    contentContainerStyle={style.bodyContentContainer}
                >
                    {mockup
                        .filter((v) =>
                            incomingSelected ? v.dateTime.isAfter(now) : v.dateTime.isBefore(now)
                        )
                        .map((v, k) => (
                            <AppointmentCard
                                key={k}
                                appointment={v}
                                onPress={() =>
                                    incomingSelected &&
                                    navigation.navigate("viewAppointment", { id: String(v.id) })
                                }
                            />
                        ))}
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
    },
});
