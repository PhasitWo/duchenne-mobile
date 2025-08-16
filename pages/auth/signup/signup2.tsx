import {
    View,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    InputAccessoryView,
    Button,
    Platform,
    Pressable,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { style, Asterisk, placeholderColor } from "./signup1";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import type { SignupStackParamList } from "./_stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignupContext } from "@/hooks/signupContext";
import dayjs from "dayjs";
import CustomText from "@/components/CustomText";
import CustomTextInput from "@/components/CustomTextInput";

type Props = NativeStackScreenProps<SignupStackParamList, "signup2">;
export default function Signup2({ navigation }: Props) {
    const { signupData, setSignupData, validateFields } = useSignupContext();
    const [showDate, setShowDate] = useState(false);
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const email_ref = useRef<TextInput>(null);

    const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        if (currentDate && event.type === "set") {
            setSignupData({ ...signupData, birthDate: dayjs(currentDate).unix() });
        }
        setShowDate(false);
    };

    async function handleNext() {
        // validate field
        const emptyField = validateFields(["phone", "email"]);
        if (emptyField) {
            Alert.alert(t("common.alert.error"), t("signup.missing") + ": " + t(`signup.${emptyField}`));
            return;
        }
        if (signupData.email && !signupData.email.includes("@")) {
            Alert.alert(t("common.alert.error"), t("signup.alert.invalid_email"));
            return;
        }
        navigation.navigate("signup3");
    }

    return (
        <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} behavior="padding">
            <ScrollView
                contentContainerStyle={[style.formContainer, { paddingBottom: insets.bottom }]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={style.inputContainer}>
                    <CustomText style={style.label}>
                        {t("signup.phone")}
                        <Asterisk />
                    </CustomText>
                    <CustomTextInput
                        inputAccessoryViewID="phone"
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.phone}
                        onChangeText={(text) => setSignupData({ ...signupData, phone: text })}
                        onSubmitEditing={() => email_ref.current?.focus()}
                        submitBehavior="submit"
                        keyboardType="number-pad"
                        returnKeyType="next"
                    />
                    {Platform.OS === "ios" && (
                        <InputAccessoryView nativeID="phone" backgroundColor="whitesmoke">
                            <Button onPress={() => email_ref.current?.focus()} title="Next" />
                        </InputAccessoryView>
                    )}
                </View>
                <View style={style.inputContainer}>
                    <CustomText style={style.label}>{t("signup.email")}</CustomText>
                    <CustomTextInput
                        ref={email_ref}
                        style={style.input}
                        value={signupData.email}
                        onChangeText={(text) => setSignupData({ ...signupData, email: text })}
                        keyboardType="email-address"
                        placeholderTextColor={placeholderColor}
                        returnKeyType="done"
                    />
                </View>
                <View style={style.inputContainer}>
                    <CustomText style={style.label}>{t("signup.birthDate")}</CustomText>
                    <Pressable
                        style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.input]}
                        onPress={() => setShowDate(true)}
                    >
                        <CustomText>{dayjs(signupData.birthDate * 1000).format("DD/MM/YYYY")}</CustomText>
                    </Pressable>
                </View>
                {showDate && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dayjs(signupData.birthDate * 1000).toDate()}
                        mode="date"
                        display={Platform.OS == "ios" ? "spinner" : "default"}
                        onChange={onDateChange}
                        themeVariant="light"
                    />
                )}
                <CustomButton
                    title={t("signup.next")}
                    normalColor={color.tint}
                    pressedColor={darkGrey}
                    style={{ height: 60, borderRadius: 10, marginTop: 10 }}
                    onPress={handleNext}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
