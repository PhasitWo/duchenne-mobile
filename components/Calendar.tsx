import { View, StyleSheet } from "react-native";
import CalendarDate from "./Calendar.date";
import dayjs from "dayjs";
import { useLanguage } from "@/hooks/useLanguage";
import { useMemo } from "react";
import CustomText from "./CustomText";

export default function Calendar({ markedDateKey }: { markedDateKey: number[] }) {
    const { currentLang } = useLanguage();
    const days = [];
    for (let i = 0; i < 7; i++) {
        days.push(dayjs().add(i, "day"));
    }
    const currentMonth = useMemo(() => dayjs().format("MMMM YYYY"), [currentLang]);
    return (
        <View style={style.container}>
            <CustomText>{currentMonth}</CustomText>
            <View style={{ flexDirection: "row" }}>
                {days.map((v, k) => (
                    <CalendarDate
                        key={k}
                        dayText={v.format(currentLang === "th" ? "dd" : "ddd")}
                        dayNumber={v.format("D")}
                        now={k === 0 ? true : false}
                        marked={markedDateKey.includes(k)}
                    />
                ))}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "90%",
        height: 60,
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
    },
    stroke: {
        backgroundColor: "white",
        width: "70%",
        height: 5,
        position: "absolute",
        bottom: 18,
        zIndex: 0,
    },
});
