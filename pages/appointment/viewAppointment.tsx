import { View, Pressable, StyleSheet, Alert } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { darkGrey } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { type StackParamList } from "./_stack";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import { useTranslation } from "react-i18next";
import CustomText from "@/components/CustomText";

type mode = "date" | "time";

type Props = NativeStackScreenProps<StackParamList, "viewAppointment">;

export default function ViewAppointment({ route, navigation }: Props) {
    const { id } = route.params;
    const [date, setDate] = useState<Date>(dayjs().toDate());
    const [mode, setMode] = useState<mode>("date");
    const [selected, setSelected] = useState<string>("");
    const [show, setShow] = useState(false);
    const { apmntList, fetch } = useAppointmentContext();
    const { t } = useTranslation();
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    function showDeleteAlert() {
        Alert.alert(
            t("common.alert.sure"),
            undefined,
            [{ text: t("common.alert.delete"), onPress: handleDelete }, { text: t("common.alert.cancel") }],
            { cancelable: true }
        );
    }
    async function handleDelete() {
        try {
            setIsLoading(true);
            const response = await api.delete("/api/appointment/" + id);
            switch (response.status) {
                case 204:
                    fetch();
                    Alert.alert("", t("viewAppointment.alert.204"));
                    navigation.navigate("index");
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("common.alert.401"));
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const current = apmntList.find((v) => v.id === parseInt(id as string));
        if (current) {
            setDate(current?.dateTime.toDate());
            setSelected(current?.doctor ?? "");
        }
    }, []);

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate) {
            setShow(false);
            setDate(currentDate);
        }
    };

    const showMode = (currentMode: mode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };
    return (
        <View style={style.container}>
            <Pressable style={style.pressable} disabled>
                <CustomText>{selected}</CustomText>
            </Pressable>
            <Pressable style={style.pressable} onPress={showDatepicker} disabled>
                <CustomText>{dayjs(date).format("D MMMM YYYY")}</CustomText>
            </Pressable>
            <Pressable style={style.pressable} onPress={showTimepicker} disabled>
                <CustomText>{dayjs(date).format("HH:mm")}</CustomText>
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={dayjs().toDate()}
                />
            )}
            <CustomButton
                title={t("viewAppointment.delete")}
                normalColor={isLoading ? darkGrey : "lightsalmon"}
                onPress={showDeleteAlert}
                pressedColor={darkGrey}
                showLoading={isLoading}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
    pressable: {
        backgroundColor: "white",
        width: "100%",
        height: "15%",
        paddingLeft: "5%",
        justifyContent: "center",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
    },
    box: {
        backgroundColor: "white",
        width: "100%",
        height: "15%",
        alignItems: "center",
        borderColor: darkGrey,
        borderRadius: 0,
    },
    dropDown: {
        width: "100%",
        height: "15%",
        paddingLeft: "5%",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
    },
});
