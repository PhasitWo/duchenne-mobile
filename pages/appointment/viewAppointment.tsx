import { View, Text, Pressable, StyleSheet, Dimensions, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { darkGrey, tint, darkTint } from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "@/components/CustomButton";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { type StackParamList } from "./_stack";
import { useLanguage } from "@/hooks/useLanguage";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";

type mode = "date" | "time";

const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
    { label: "Dr.Spiderman", value: "Dr.Spiderman" },
];

type Props = NativeStackScreenProps<StackParamList, "viewAppointment">;

export default function ViewAppointment({ route, navigation }: Props) {
    const { id } = route.params;
    const [date, setDate] = useState<Date>(dayjs().toDate());
    const [mode, setMode] = useState<mode>("date");
    const [selected, setSelected] = useState<string>("");
    const [show, setShow] = useState(false);
    const { apmntList, fetch } = useAppointmentContext();
    const { lang, currentLang } = useLanguage();
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    function showDeleteAlert() {
        Alert.alert(
            lang("คุณแน่ใจหรือไม่", "Are you sure?"),
            undefined,
            [{ text: lang("ลบ", "Delete"), onPress: handleDelete }, { text: lang("ยกเลิก", "Cancel") }],
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
                    Alert.alert("", lang("ลบนัดหมายแล้ว", "Deleted successfully"));
                    navigation.navigate("index");
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.status ?? ""} ${err.code}`);
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
                <Text>{selected}</Text>
            </Pressable>
            <Pressable style={style.pressable} onPress={showDatepicker} disabled>
                <Text>{dayjs(date).locale(currentLang).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable style={style.pressable} onPress={showTimepicker} disabled>
                <Text>{dayjs(date).format("HH:mm")}</Text>
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
                title={lang("ลบนัดหมาย", "Delete")}
                normalColor={isLoading ? darkGrey : "lightsalmon"}
                onPress={showDeleteAlert}
                pressedColor={darkGrey}
                showLoading={isLoading}
            />
            <Text>selected: {date.toString()}</Text>
            <Text>{apmntList.length}</Text>
        </View>
    );
}

const screenHeight = Dimensions.get("screen").height;
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
