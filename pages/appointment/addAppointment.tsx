import { View, Text, Button, Pressable, StyleSheet, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { darkGrey, tint, darkTint } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { Dropdown } from "react-native-element-dropdown";
import * as Calendar from "expo-calendar";
import * as Notifications from "expo-notifications";
import { type DateTriggerInput } from "expo-notifications";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NotificationRequestInput } from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
type mode = "date" | "time";
type localNotification = { identifier: string } & NotificationRequestInput;
type localAppointment = {
    identifier: string;
    date: Date;
    doctor: string;
    notifications: localNotification[];
};

const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
];

export default function AddAppointment() {
    const [date, setDate]: [date: Date, setDate: Function] = useState(dayjs().toDate());
    const [mode, setMode]: [mode: mode, setMode: Function] = useState("date");
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState("");
    const navigation = useNavigation();

    async function handleSave() {
        // validate input
        let localNoti = []
        if (selected === "") {
            Alert.alert("Error", "Please select a doctor from the list");
            return;
        }
        if (dayjs(date).isBefore(dayjs())) {
            Alert.alert("Error", "Invalid Date");
            return;
        }
        try {
            localNoti = await scheduleLocalNotification();
            localStoreAppointment(localNoti)
        } catch (err) {
            Alert.alert("Error", err as string);
            return;
        }
        Alert.alert("Appointment Saved!", `${date.toLocaleString()}\n${selected}`, [
            {
                text: "Ok",
                onPress: () => {
                    navigation.navigate("appointment" as never);
                },
            },
        ]);
    }

    async function scheduleLocalNotification() : Promise<localNotification[]> {
        const OFFSET = [0, 5, 10];
        const now = dayjs();
        let toStoreNoti: localNotification[] = [];
        for (let offset of OFFSET) {
            let d = dayjs(date).subtract(offset, "minute");
            if (d.isBefore(now)) continue;
            let notiInput: NotificationRequestInput = {
                content: { title: "Doctor Appointment", body: selected },
                trigger: { date: d.toDate() },
            };
            let id = await Notifications.scheduleNotificationAsync(notiInput);
            console.log("notification id => " + id);
            let noti: localNotification = {
                ...notiInput,
                identifier: id,
            };
            // **JSON.stringfy will convert date to ISO string**
            toStoreNoti.push(noti);
        }
        return toStoreNoti
    }

    async function localStoreAppointment(localNotifications: localNotification[]) {
        let apmnt: localAppointment = {
            identifier: "A" + new Date().getTime(),
            date: date,
            doctor: selected,
            notifications: localNotifications,
        };
        // store
        console.log(JSON.stringify(apmnt))
    }

    const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
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
    //TODO validate that selected time is after today date and time
    return (
        <View style={style.container}>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? darkGrey : "white" },
                    style.dateTime,
                ]}
                onPress={showDatepicker}
            >
                <Text>{dayjs(date).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? darkGrey : "white" },
                    style.dateTime,
                ]}
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
            <Dropdown
                style={{
                    width: "100%",
                    height: "15%",
                    backgroundColor: "white",
                    paddingLeft: "5%",
                }}
                data={mockup}
                labelField="label"
                valueField="value"
                onChange={(item) => setSelected(item.value)}
                value={selected}
                search
            />
            <CustomButton
                title="Save"
                normalColor={tint}
                pressedColor={darkTint}
                onPress={handleSave}
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
