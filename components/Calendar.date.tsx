import { View, Text, StyleSheet } from "react-native";

export default function CalendarDate({
    dayText,
    dayNumber,
    now,
}: {
    dayText: string;
    dayNumber: number | string;
    now?: boolean;
}) {
    return (
        <View style={style.container}>
            <Text>{dayText}</Text>
            <View style={style.date}>
                <Text style={{ color: now ? "red" : "" }}>{dayNumber}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        zIndex: 1,
    },
    date: {
        backgroundColor: "white",
        height: 35,
        width: 35,
        borderRadius: 100,
        margin: 6,
        alignItems: "center",
        justifyContent: "center",
    },
});
