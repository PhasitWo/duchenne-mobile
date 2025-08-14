import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { useRef } from "react";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import type { SignupStackParamList } from "./_stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignupContext } from "@/hooks/signupContext";

type Props = NativeStackScreenProps<SignupStackParamList, "signup1">;
export default function Signup({ navigation }: Props) {
    const { signupData, setSignupData, validateFields } = useSignupContext();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const firstName_ref = useRef<TextInput>(null);
    const middleName_ref = useRef<TextInput>(null);
    const lastName_ref = useRef<TextInput>(null);

    async function handleNext() {
        // validate field
        const emptyField = validateFields(["hn", "firstName", "middleName", "lastName"]);
        if (emptyField) {
            Alert.alert(t("common.alert.error"), t("signup.missing") + ": " + t(`signup.${emptyField}`));
            return;
        }
        navigation.navigate("signup2");
    }
    return (
        <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} behavior="padding">
            <ScrollView
                contentContainerStyle={[style.formContainer, { paddingBottom: insets.bottom }]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        HN
                        <Asterisk />
                    </Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.hn}
                        onChangeText={(text) => setSignupData({ ...signupData, hn: text })}
                        onSubmitEditing={() => firstName_ref.current?.focus()}
                        submitBehavior="submit"
                        returnKeyType="next"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.firstName")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={firstName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.firstName}
                        onChangeText={(text) => setSignupData({ ...signupData, firstName: text })}
                        onSubmitEditing={() => middleName_ref.current?.focus()}
                        submitBehavior="submit"
                        returnKeyType="next"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{t("signup.middleName")}</Text>
                    <TextInput
                        ref={middleName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.middleName}
                        onChangeText={(text) => setSignupData({ ...signupData, middleName: text })}
                        onSubmitEditing={() => lastName_ref.current?.focus()}
                        submitBehavior="submit"
                        returnKeyType="next"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.lastName")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={lastName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.lastName}
                        onChangeText={(text) => setSignupData({ ...signupData, lastName: text })}
                        submitBehavior="blurAndSubmit"
                        returnKeyType="done"
                    />
                </View>

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

export const placeholderColor = darkGrey;
export const style = StyleSheet.create({
    formContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    inputContainer: {
        width: 350,
        height: 70,
        justifyContent: "center",
        marginBottom: 15,
    },
    label: {
        flex: 1,
        paddingLeft: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: darkGrey,
        margin: 5,
        padding: 5,
        color: "black",
    },
    lang: {
        position: "absolute",
        top: 5,
    },
    asterisk: {
        color: "red",
    },
});

export const Asterisk = () => <Text style={style.asterisk}>*</Text>;
