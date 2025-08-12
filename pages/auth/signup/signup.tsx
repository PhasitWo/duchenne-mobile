import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    InputAccessoryView,
    Button,
    Platform,
} from "react-native";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import type { SignupStackParamList } from "./_stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
export type SignupData = {
    hn: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    email: string;
    pin: string;
};
type Props = NativeStackScreenProps<SignupStackParamList, "signup">;
export default function Signup({ navigation }: Props) {
    const [signupData, setSignupData] = useState<SignupData>({
        hn: "",
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        pin: "",
    });
    const [confirmPin, setConfirmPin] = useState("");
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const firstName_ref = useRef<TextInput>(null);
    const middleName_ref = useRef<TextInput>(null);
    const lastName_ref = useRef<TextInput>(null);
    const phone_ref = useRef<TextInput>(null);
    const email_ref = useRef<TextInput>(null);
    const pin_ref = useRef<TextInput>(null);
    const cf_pin_ref = useRef<TextInput>(null);

    function validateFields(): keyof SignupData | null {
        const EXCEPTIONFIELDS = ["middleName", "email"];
        let key: keyof SignupData;
        for (key in signupData) {
            signupData[key] = signupData[key].trim(); // trim all inputs
            if (EXCEPTIONFIELDS.includes(key)) continue;
            if (signupData[key].length === 0) return key;
        }
        return null;
    }

    const { apiNoAuth } = useApiContext();
    async function handleSignup() {
        // validate field
        const emptyField = validateFields();
        if (emptyField) {
            Alert.alert(t("common.alert.error"), t("signup.missing") + ": " + t(`signup.${emptyField}`));
            return;
        }
        if (signupData.email && !signupData.email.includes("@")) {
            Alert.alert(t("common.alert.error"), t("signup.alert.invalid_email"));
            return;
        }
        if (signupData.pin.length < 6 || confirmPin.length < 6) {
            Alert.alert(t("common.alert.error"), t("signup.alert.require_digit_pin"));
            return;
        }
        if (signupData.pin !== confirmPin) {
            Alert.alert(t("common.alert.error"), t("signup.alert.pin_mismatched"));
            return;
        }
        // check signup data in server
        setIsLoading(true);
        try {
            const response = await apiNoAuth.post("/auth/signup", signupData, { timeout: 5000 });
            switch (response.status) {
                case 200:
                    Alert.alert(t("signup.alert.200"));
                    navigation.navigate("login", {
                        hn: signupData.hn,
                        pin: "",
                    });
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("signup.alert.401"));
                    break;
                case 409:
                    Alert.alert(t("common.alert.error"), t("signup.alert.409"));
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status === 404)
                    Alert.alert(t("common.alert.error"), t("signup.alert.404", { hn: signupData.hn }));
                else Alert.alert("Request Error", `${err.message ?? ""} ${JSON.stringify(err.response)}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={style.formContainer} keyboardShouldPersistTaps="handled">
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
                        editable={!isLoading}
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
                        editable={!isLoading}
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
                        editable={!isLoading}
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
                        onSubmitEditing={() => phone_ref.current?.focus()}
                        submitBehavior="submit"
                        returnKeyType="next"
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.phone")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        inputAccessoryViewID="phone"
                        ref={phone_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.phone}
                        onChangeText={(text) => setSignupData({ ...signupData, phone: text })}
                        onSubmitEditing={() => email_ref.current?.focus()}
                        submitBehavior="submit"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        editable={!isLoading}
                    />
                    {Platform.OS === "ios" && (
                        <InputAccessoryView nativeID="phone" backgroundColor="whitesmoke">
                            <Button onPress={() => email_ref.current?.focus()} title="Next" />
                        </InputAccessoryView>
                    )}
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{t("signup.email")}</Text>
                    <TextInput
                        ref={email_ref}
                        style={style.input}
                        value={signupData.email}
                        onChangeText={(text) => setSignupData({ ...signupData, email: text })}
                        onSubmitEditing={() => pin_ref.current?.focus()}
                        keyboardType="email-address"
                        placeholderTextColor={placeholderColor}
                        returnKeyType="next"
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.pin")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={pin_ref}
                        inputAccessoryViewID="pin"
                        maxLength={6}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.pin}
                        onChangeText={(text) => setSignupData({ ...signupData, pin: text })}
                        onSubmitEditing={() => cf_pin_ref.current?.focus()}
                        submitBehavior="submit"
                        keyboardType="number-pad"
                        returnKeyType="next"
                        secureTextEntry
                        editable={!isLoading}
                    />
                    {Platform.OS === "ios" && (
                        <InputAccessoryView nativeID="pin" backgroundColor="whitesmoke">
                            <Button onPress={() => cf_pin_ref.current?.focus()} title="Next" />
                        </InputAccessoryView>
                    )}
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.confirm_pin")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={cf_pin_ref}
                        maxLength={6}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={confirmPin}
                        onChangeText={(text) => setConfirmPin(text)}
                        submitBehavior="blurAndSubmit"
                        keyboardType="number-pad"
                        returnKeyType="done"
                        secureTextEntry
                        editable={!isLoading}
                    />
                </View>
                <CustomButton
                    title={t("signup.signup")}
                    normalColor={color.tint}
                    pressedColor={darkGrey}
                    style={{ height: 60, borderRadius: 10, marginTop: 10 }}
                    onPress={handleSignup}
                    showLoading={isLoading}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const placeholderColor = darkGrey;
const style = StyleSheet.create({
    formContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 50,
        paddingBottom: 50,
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
    },
    lang: {
        position: "absolute",
        top: 5,
    },
    asterisk: {
        color: "red",
    },
});

const Asterisk = () => <Text style={style.asterisk}>*</Text>;
