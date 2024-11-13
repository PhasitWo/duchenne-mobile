import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { darkGrey, tint, darkTint } from "@/constants/Colors";
import { Dropdown } from "react-native-element-dropdown";
import CustomButton from "@/components/CustomButton";
import { useAppointmentContext } from "@/hooks/appointmentContext";
import { useLocalSearchParams } from "expo-router";
type mode = "date" | "time";

const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
    { label: "Dr.Spiderman", value: "Dr.Spiderman" },
];

export default function ViewAppointment() {
    const [date, setDate]: [date: Date, setDate: Function] = useState(dayjs().toDate());
    const [mode, setMode]: [mode: mode, setMode: Function] = useState("date");
    const [selected, setSelected]: [selected: string, setSelected: Function] = useState("");
    const [onEdit, setOnEdit]: [onEdit: boolean, setOnEdit: Function] = useState(false);
    const [show, setShow] = useState(false);
    const { apmntList, setApmtList } = useAppointmentContext();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const current = apmntList.find((v) => v.id === parseInt(id as string));
        setDate(current?.dateTime.toDate());
        setSelected(current?.doctor);
    }, []);

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
                    { backgroundColor: pressed ? darkGrey : onEdit ? "white" : "whitesmoke" },
                    style.dateTime,
                ]}
                onPress={showDatepicker}
                disabled={!onEdit}
            >
                <Text>{dayjs(date).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    { backgroundColor: pressed ? darkGrey : onEdit ? "white" : "whitesmoke" },
                    style.dateTime,
                ]}
                onPress={showTimepicker}
                disabled={!onEdit}
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
                style={[{ backgroundColor: onEdit ? "white" : "whitesmoke" }, style.dropDown]}
                data={mockup}
                labelField="label"
                valueField="value"
                onChange={(item) => setSelected(item.value)}
                value={selected}
                search
                disable={!onEdit}
            />
            {onEdit ? (
                <CustomButton title="Save" normalColor={tint} pressedColor={darkTint} />
            ) : (
                <CustomButton
                    title="Edit"
                    normalColor="lightsalmon"
                    pressedColor={darkTint}
                    onPress={() => setOnEdit(true)}
                />
            )}
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
        width: "100%",
        height: "15%",
        paddingLeft: "5%",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
    },
});
