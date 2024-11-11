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
type mode = "date" | "time";

const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
];

export default function AddAppointment() {
    const [date, setDate]: [date: Date, setDate: Function] = useState(dayjs().toDate());
    const [mode, setMode]: [mode: mode, setMode: Function] = useState("date");
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState("");

    // useEffect(() => {
    //     calendarEvent();
    // }, []);

    async function handleSave() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === "granted") {
            // create calendar
            // const res = await Calendar.createCalendarAsync({
            //     title: "EXPO CALENDAR",
            //     name: "EXPO CALENDAR",
            //     color:"red",
            //     accessLevel: Calendar.CalendarAccessLevel.EDITOR,
            //     ownerAccount: "My calendar",
            //     source: { isLocalAccount: true, name: "EXPO CALENDAR", type: "LOCAL" },
            // });
            // console.log(res);
            // get all calendars
            // const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            // console.log("Here are all your calendars:");
            // for (let c of calendars) {
            //     console.log(c.name, c.id)
            // };
            // get events
            // const events = await Calendar.getEventsAsync(["1"], dayjs().toDate(), dayjs("2024-11-30").toDate())
            // create event
            // let res = await Calendar.createEventAsync("1", {
            //     title: selected,
            //     startDate: date,
            //     endDate: dayjs(date).add(1, "hour").toDate(),
            // });
            // console.log(res + " created")
        }
    }

    async function testNotification() {
        const prior = await Notifications.getAllScheduledNotificationsAsync();
        console.log(prior)
        const id = await Notifications.scheduleNotificationAsync({
            content: { title: "Time's up!!", body: "FROM EXPO" },
            trigger: { seconds: 10 },
            
        });
        console.log("notification id => " + id);
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
                onPress={() => testNotification()}
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
