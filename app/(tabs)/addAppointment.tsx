import { View, Text, Button, Pressable, StyleSheet, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import dayjs from "dayjs";
import {  darkGrey, tint, darkTint } from "@/constants/Colors";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "@/components/CustomButton";
type mode = "date" | "time";

const mockup = [
    { key: "1", value: "Dr.Earth Bindai" },
    { key: "2", value: "Dr.Ploy Jinjai" },
];

export default function AddAppointment() {
    const [date, setDate]: [date: Date, setDate: Function] = useState(dayjs().toDate());
    const [mode, setMode]: [mode: mode, setMode: Function] = useState("date");
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState("");

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
            <SelectList
                setSelected={(val: string) => setSelected(val)}
                data={mockup}
                boxStyles={style.box}
                dropdownStyles={style.dropDown}
            />
            <CustomButton title="Save" normalColor={tint} pressedColor={darkTint}/>
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
        height: 0.1 * screenHeight,
        paddingLeft: "5%",
        justifyContent: "center",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
    },
    box: {
        backgroundColor: "white",
        width: "100%",
        height: 0.1 * screenHeight,
        alignItems: "center",
        borderColor: darkGrey,
        borderRadius: 0,
    },
    dropDown: {
        backgroundColor: "white",
    },
});
