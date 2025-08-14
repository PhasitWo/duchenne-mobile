import { View, Text, StyleSheet } from "react-native";

export default function CalendarDate({
    dayText,
    dayNumber,
    now,
    marked,
}: {
    dayText: string;
    dayNumber: number | string;
    now?: boolean;
    marked: boolean;
}) {
    return (
        <View style={style.container}>
            <Text>{dayText}</Text>
            <View style={[{ backgroundColor: marked ? "#f85c5c" : "white" }, style.date]}>
                <Text style={{ color: now && !marked ? "red" : "black" }}>{dayNumber}</Text>
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
        height: 35,
        width: 35,
        borderRadius: 100,
        margin: 6,
        alignItems: "center",
        justifyContent: "center",
    },
});
