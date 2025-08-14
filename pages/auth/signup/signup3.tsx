import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    InputAccessoryView,
    Button,
    Platform,
} from "react-native";
import { style, Asterisk, placeholderColor } from "./signup1";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import type { SignupStackParamList } from "./_stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSignupContext } from "@/hooks/signupContext";
import { AxiosError } from "axios";
import { useApiContext } from "@/hooks/apiContext";

type Props = NativeStackScreenProps<SignupStackParamList, "signup3">;
export default function Signup3({ navigation }: Props) {
    const { signupData, setSignupData, validateFields } = useSignupContext();
    const [confirmPin, setConfirmPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const cf_pin_ref = useRef<TextInput>(null);
    const { apiNoAuth } = useApiContext();

    async function handleNext() {
        // validate field
        const emptyField = validateFields(["pin"]);
        if (emptyField) {
            Alert.alert(t("common.alert.error"), t("signup.missing") + ": " + t(`signup.${emptyField}`));
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
                case 201:
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
            <ScrollView
                contentContainerStyle={[style.formContainer, { paddingBottom: insets.bottom }]}
                keyboardShouldPersistTaps="handled"
            >
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {t("signup.pin")}
                        <Asterisk />
                    </Text>
                    <TextInput
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
                    onPress={handleNext}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
