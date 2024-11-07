import { Text, View, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import Calendar from "@/components/Calendar";
import AppointmentCard from "@/components/AppointmentCard";
import { type appointment } from "@/components/AppointmentCard";
import { grey, darkGrey } from "@/constants/Colors";


const mockup: Array<appointment> = [
    {
        date: "12 January 2025",
        time: "10:30 am to 11:00 am",
        doctor: "Dr.Earth Bindai",
        status: "incoming",
    },
    {
        date: "12 January 2025",
        time: "10:30 am to 11:00 am",
        doctor: "Dr.Earth Bindai",
        status: "incoming",
    },
    {
        date: "12 January 2025",
        time: "10:30 am to 11:00 am",
        doctor: "Dr.Earth Bindai",
        status: "incoming",
    },
    {
        date: "12 January 2025",
        time: "10:30 am to 11:00 am",
        doctor: "Dr.Earth Bindai",
        status: "history",
    },
    {
        date: "12 January 2025",
        time: "10:30 am to 11:00 am",
        doctor: "Dr.Earth Bindai",
        status: "history",
    },
];

export default function Appointment() {
    const [incomingSelected, setIncomingSelected] = useState(true);
    //TODO markDateKey logic
    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Calendar markedDateKey={[]}/>
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
            <View style={style.bodyContainer}>
                {mockup
                    .filter((v) => v.status === (incomingSelected ? "incoming" : "history"))
                    .map((v, k) => (
                        <AppointmentCard key={k} appointment={v} />
                    ))}
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
    bodyContainer: {
        backgroundColor: "white",
        borderRadius: 40,
        width: "90%",
        height: "70%",
        marginTop: 10,

        overflow: "hidden",
    },
});
