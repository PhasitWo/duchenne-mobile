import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
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

type mode = "date" | "time";

const mockup = [
    { label: "Dr.Earth Bindai", value: "Dr.Earth Bindai" },
    { label: "Dr.Ploy Jinjai", value: "Dr.Ploy Jinjai" },
    { label: "Dr.Spiderman", value: "Dr.Spiderman" },
];

type Props = NativeStackScreenProps<StackParamList, "viewAppointment">;

export default function ViewAppointment({ route }: Props) {
    const [date, setDate]: [date: Date, setDate: Function] = useState(dayjs().toDate());
    const [mode, setMode]: [mode: mode, setMode: Function] = useState("date");
    const [selected, setSelected]: [selected: string, setSelected: Function] = useState("");
    const [show, setShow] = useState(false);
    const { apmntList, setApmtList } = useAppointmentContext();
    const { id } = route.params;

    function handleDelete() {
        //TODO delete appointment
    }

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
    return (
        <View style={style.container}>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "whitesmoke" }, style.dateTime]}
                onPress={showDatepicker}
                disabled
            >
                <Text>{dayjs(date).format("D MMMM YYYY")}</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "whitesmoke" }, style.dateTime]}
                onPress={showTimepicker}
                disabled
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
                style={[{ backgroundColor: "whitesmoke" }, style.dropDown]}
                data={mockup}
                labelField="label"
                valueField="value"
                onChange={(item) => setSelected(item.value)}
                value={selected}
                search
                disable
            />
            <CustomButton title="Delete" normalColor="lightsalmon" pressedColor={darkGrey} />
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
