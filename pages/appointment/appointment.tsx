import { Text, View, ScrollView, StyleSheet, Pressable, RefreshControl } from "react-native";
import { useState, useMemo, useCallback, useEffect } from "react";
import Calendar from "@/components/Calendar";
import AppointmentCard from "@/components/AppointmentCard";
import { grey, darkGrey, color } from "@/constants/Colors";
import dayjs from "dayjs";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import { StackParamList } from "./_stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import SwipeHand from "@/components/SwipeHand";
import useTutorial from "@/hooks/useTutorial";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";

type props = NativeStackScreenProps<StackParamList, "index">;

export default function Appointment({ navigation }: props) {
    const [incomingSelected, setIncomingSelected] = useState(true);
    const [showTutorial, setShowTutorial] = useState(false);
    const { apmntList, isLoading, fetch } = useAppointmentContext();
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const now = dayjs();
    // tutorial onmount
    useEffect(() => {
        const { getShowAppointmentTutorial, setShowAppointmentTutorial } = useTutorial();
        getShowAppointmentTutorial().then((value) => setShowTutorial(value));
        setTimeout(() => {
            setShowTutorial(false);
            setShowAppointmentTutorial(false);
        }, 5200);
    }, []);
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
            if (apmt.approveAt === null) continue;
            if (apmt.dateTime.isBefore(now)) continue;
            let diff = apmt.dateTime.hour(0).minute(0).second(0).diff(normalizedNow, "day", true);
            res.push(Math.ceil(diff));
        }
        return res;
    }, [apmntList, isLoading]);
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
    }, [apmntList, incomingSelected, isLoading, currentLang]);

    return (
        <View
            style={{
                alignItems: "center",
                backgroundColor: color.base,
            }}
        >
            {showTutorial && <SwipeHand from={250} to={500} />}
            <Calendar markedDateKey={markedDateKey} />
            <View style={style.headContainer}>
                <Pressable
                    style={[{ backgroundColor: incomingSelected ? darkGrey : grey }, style.head]}
                    onPress={() => setIncomingSelected(true)}
                >
                    <View>
                        <Text>{t("appointment.incoming")}</Text>
                    </View>
                </Pressable>
                <Pressable
                    style={[{ backgroundColor: !incomingSelected ? darkGrey : grey }, style.head]}
                    onPress={() => setIncomingSelected(false)}
                >
                    <View>
                        <Text>{t("appointment.history")}</Text>
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
                    {display.length > 0 ? display : <Text>{t("common.no_data")}</Text>}
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
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
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
        height: "69%",
        backgroundColor: "white",
        padding: "3%",
        marginTop: 10,
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
    },
    bodyContainer: {
        width: "100%",
        overflow: "hidden",
        borderRadius: 40,
    },
    bodyContentContainer: {
        overflow: "hidden",
        alignItems: "center",
        paddingBottom: 50,
    },
});
