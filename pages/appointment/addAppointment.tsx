import { View, Text, Pressable, StyleSheet, Alert, Platform } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import { darkGrey, tint, darkTint, color } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@/hooks/authContext";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiDoctorModel } from "@/model/model";
import LoadingView from "@/components/LoadingView";
import { useTranslation } from "react-i18next";

type mode = "date" | "time";
type DropdownList = {
    label: string;
    value: string;
};

export default function AddAppointment() {
    const [date, setDate] = useState<Date>(dayjs().toDate());
    const [mode, setMode] = useState<mode>("date");
    const [show, setShow] = useState(false);
    const [doctorList, setDoctorList] = useState<DropdownList[]>([]);
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const { logoutDispatch } = useAuthContext();
    const { api } = useApiContext();
    const { t } = useTranslation();
    // fetch doctor data
    async function fetchDoctor() {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiDoctorModel[], any>, any>("/api/doctor");
            switch (response.status) {
                case 200:
                    setDoctorList(
                        response.data.map((v) => ({
                            label: `${v.firstName} ${v.middleName ?? ""} ${v.lastName} ${v.specialist !== null ? `(${v.specialist})` : ""}`,
                            value: `${v.id}`,
                        }))
                    );
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("common.alert.401"));
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
                    navigation.navigate("learn" as never);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
                navigation.navigate("learn" as never);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
                navigation.navigate("learn" as never);
            }
        } finally {
            setIsLoading(false);
        }
    }

    // fetch data on focus
    useFocusEffect(
        useCallback(() => {
            fetchDoctor();
        }, [])
    );

    // save
    function showSaveAlert() {
        // validate input
        if (selected === "") {
            Alert.alert(t("common.alert.error"), t("addAppointment.alert.select_doctor"));
            return;
        }
        // validate that selected time is after today date and time
        if (dayjs(date).isBefore(dayjs())) {
            Alert.alert(t("addAppointment.alert.invalid_date"), t("addAppointment.alert.select_future"));
            return;
        }
        Alert.alert(
            t("addAppointment.alert.verify"),
            `${doctorList.find((v) => v.value == selected)?.label}\n${date.toLocaleString()}`,
            [
                {
                    text: t("common.alert.confirm"),
                    onPress: handleSave,
                },
                {
                    text: t("common.alert.cancel"),
                },
            ]
        );
    }

    async function handleSave() {
        try {
            setIsLoading(true);
            const response = await api.post("/api/appointment", {
                date: dayjs(date).unix(),
                doctorId: parseInt(selected),
            });
            switch (response.status) {
                case 201:
                    Alert.alert(t("addAppointment.alert.201"), t("addAppointment.alert.201_body"));
                    navigation.navigate("appointment" as never);
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("common.alert.401"));
                    logoutDispatch();
                    break;
                case 422:
                    Alert.alert(t("addAppointment.alert.invalid_date"), t("addAppointment.alert.select_future"));
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

    const onChange = (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
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

    if (isLoading) return <LoadingView />;

    return (
        <View style={style.container}>
            <Dropdown
                style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: "white",
                    paddingLeft: "5%",
                    borderBottomColor: darkGrey,
                    borderBottomWidth: 1,
                }}
                data={doctorList}
                labelField="label"
                valueField="value"
                onChange={(item) => setSelected(item.value)}
                value={selected}
                search
                placeholder={t("addAppointment.select_doctor")}
                disable={isLoading}
            />
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.dateTime]}
                onPress={showDatepicker}
                disabled={isLoading}
            >
                <Text>{dayjs(date).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.dateTime]}
                onPress={showTimepicker}
                disabled={isLoading}
            >
                <Text>{dayjs(date).format("HH:mm")}</Text>
            </Pressable>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    display={Platform.OS == "ios" ? "spinner" : "default"}
                    is24Hour={true}
                    onChange={onChange}
                    minimumDate={dayjs().toDate()}
                    themeVariant="light"
                />
            )}
            <CustomButton
                title={t("common.save")}
                normalColor={tint}
                pressedColor={darkTint}
                onPress={showSaveAlert}
                showLoading={isLoading}
            />
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: color.base,
    },
    dateTime: {
        width: "100%",
        height: 100,
        paddingLeft: "5%",
        justifyContent: "center",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
    },
    box: {
        backgroundColor: "white",
        width: "100%",
        height: 100,
        alignItems: "center",
        borderColor: darkGrey,
        borderRadius: 0,
    },
    dropDown: {
        backgroundColor: "white",
    },
});

// manipulate device calendar
// async function handleSave() {
//     const { status } = await Calendar.requestCalendarPermissionsAsync();
//     if (status === "granted") {
//         // create calendar
//         // const res = await Calendar.createCalendarAsync({
//         //     title: "EXPO CALENDAR",
//         //     name: "EXPO CALENDAR",
//         //     color:"red",
//         //     accessLevel: Calendar.CalendarAccessLevel.EDITOR,
//         //     ownerAccount: "My calendar",
//         //     source: { isLocalAccount: true, name: "EXPO CALENDAR", type: "LOCAL" },
//         // });
//         // console.log(res);
//         // get all calendars
//         // const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
//         // console.log("Here are all your calendars:");
//         // for (let c of calendars) {
//         //     console.log(c.name, c.id)
//         // };
//         // get events
//         // const events = await Calendar.getEventsAsync(["1"], dayjs().toDate(), dayjs("2024-11-30").toDate())
//         // create event
//         // let res = await Calendar.createEventAsync("1", {
//         //     title: selected,
//         //     startDate: date,
//         //     endDate: dayjs(date).add(1, "hour").toDate(),
//         // });
//         // console.log(res + " created")
//     }
// }
