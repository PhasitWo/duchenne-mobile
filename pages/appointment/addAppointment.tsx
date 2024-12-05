import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { darkGrey, tint, darkTint } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuthContext } from "@/hooks/authContext";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiDoctorModel } from "@/model/model";
import LoadingView from "@/components/LoadingView";

type mode = "date" | "time";
type DropdownList = {
    label: string;
    value: string;
};
const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
];

export default function AddAppointment() {
    const [date, setDate] = useState<Date>(dayjs().toDate());
    const [mode, setMode] = useState<mode>("date");
    const [show, setShow] = useState(false);
    const [doctorList, setDoctorList] = useState<DropdownList[]>([]);
    const [selected, setSelected] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const { lang } = useLanguage();
    const { logoutDispatch } = useAuthContext();
    const { api } = useApiContext();
    // fetch doctor data
    async function fetchDoctor() {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiDoctorModel[], any>, any>("/api/doctor");
            switch (response.status) {
                case 200:
                    setDoctorList(
                        response.data.map((v) => ({
                            label: `${v.firstName} ${v.middleName ?? ""} ${v.lastName}`,
                            value: `${v.id}`,
                        }))
                    );
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
                    navigation.navigate("learn" as never);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.status ?? ""} ${err.code}`);
                navigation.navigate("learn" as never);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
                navigation.navigate("learn" as never);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDoctor();
    }, []);

    // save
    function showSaveAlert() {
        // validate input
        if (selected === "") {
            Alert.alert(lang("เกิดข้อผิดพลาด", "Error"), lang("กรุณาเลือกคุณหมอ", "Please select a doctor from the list"));
            return;
        }
        // validate that selected time is after today date and time
        if (dayjs(date).isBefore(dayjs())) {
            Alert.alert(
                lang("เวลาไม่ถูกต้อง", "Invalid Time or Date"),
                lang("กรุณาเลือกเวลาในอนาคต", "Please select a future time")
            );
            return;
        }
        Alert.alert(
            lang("ตรวจสอบข้อมูล", "Please, verify these information"),
            `${doctorList.find((v) => v.value == selected)?.label}\n${date.toLocaleString()}`,
            [
                {
                    text: lang("ยืนยัน", "Confirm"),
                    onPress: handleSave,
                },
                {
                    text: lang("ยกเลิก", "Cancel"),
                },
            ]
        );
    }

    async function handleSave() {
        try {
            setIsLoading(true);
            const response = await api.post("/api/appointment", { date: dayjs(date).unix(), doctorId: parseInt(selected) });
            switch (response.status) {
                case 201:
                    Alert.alert(lang("บันทึกนัดหมายเรียบร้อยแล้ว", "The appointment has been scheduled"), undefined);
                    navigation.navigate("appointment" as never);
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                case 422:
                    Alert.alert(
                        lang("เวลาไม่ถูกต้อง", "Invalid Time or Date"),
                        lang("กรุณาเลือกเวลาในอนาคต", "Please select a future time")
                    );
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
                placeholder={lang("เลือกคุณหมอ", "Select Doctor")}
            />
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.dateTime]}
                onPress={showDatepicker}
            >
                <Text>{dayjs(date).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.dateTime]}
                onPress={showTimepicker}
            >
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
                title={lang("บันทึก", "Save")}
                normalColor={tint}
                pressedColor={darkTint}
                onPress={showSaveAlert}
                showLoading={isLoading}
            />
            <Text>selected: {date.toLocaleString()}</Text>
        </View>
    );
}

const screenHeight = Dimensions.get("screen").height;
const style = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
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
