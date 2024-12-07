import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { darkGrey } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import { SignupData, useSignupContext } from "@/hooks/signupContext";
import type { SignupStackParamList } from "./_stack";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError } from "axios";

const fieldMap = {
    hn: {
        en: "HN",
        th: "เลข HN",
    },
    firstName: {
        en: "First Name",
        th: "ชื่อจริง",
    },
    middleName: {
        en: "Middle Name",
        th: "ชื่อกลาง",
    },
    lastName: {
        en: "Last Name",
        th: "นามสกุล",
    },
    phone: {
        en: "Phone Number",
        th: "เบอร์โทรศัพท์",
    },
    email: {
        en: "Email",
        th: "อีเมล",
    },
};
type Props = NativeStackScreenProps<SignupStackParamList, "index">;
export default function Signup({ navigation }: Props) {
    const { signupData, setSignupData } = useSignupContext();
    const { lang, currentLang } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);

    const firstName_ref = useRef<TextInput>(null);
    const middleName_ref = useRef<TextInput>(null);
    const lastName_ref = useRef<TextInput>(null);
    const phone_ref = useRef<TextInput>(null);
    const email_ref = useRef<TextInput>(null);

    function validateFields(): keyof SignupData | null {
        const EXCEPTIONFIELDS = ["middleName"];
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
        console.log(signupData)
        // validate field
        const emptyField = validateFields();
        if (emptyField) {
            Alert.alert(
                lang("เกิดข้อผิดพลาด", "Error"),
                lang(`ขาดข้อมูล : ${fieldMap[emptyField][currentLang]}`, `missing : ${fieldMap[emptyField][currentLang]}`)
            );
            return;
        }
        if (!signupData.email.includes("@")) {
            Alert.alert(lang("เกิดข้อผิดพลาด", "Error"), lang("อีเมลไม่ถูกต้อง", "Invalid email address"));
            return;
        }
        // check signup data in server
        setIsLoading(true);
        try {
            const response = await apiNoAuth.post("/auth/signup", signupData, { timeout: 5000 });
            switch (response.status) {
                case 200:
                    Alert.alert(lang("ลงทะเบียนเสร็จสิ้น!", "Registration completed!"));
                    navigation.navigate("login", {
                        hn: signupData.hn,
                        firstName: signupData.firstName,
                        lastName: signupData.lastName,
                    });
                    break;
                case 401:
                    Alert.alert(
                        lang("เกิดข้อผิดพลาด", "Error"),
                        lang(
                            "ข้อมูลไม่ถูกต้อง (ชื่อ หรือ ชื่อกลาง หรือ นามสกุล)",
                            "Invalid credentials (first name or middle name or last name)"
                        )
                    );
                    break;
                case 409:
                    Alert.alert(
                        lang("เกิดข้อผิดพลาด", "Error"),
                        lang("บัญชีนี้ได้ลงทะเบียนแล้ว", "The account with this HN has already been verified")
                    );
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status === 404)
                    Alert.alert(
                        lang("เกิดข้อผิดพลาด", "Error"),
                        lang(`ไม่มีบัญชีที่มีรหัส HN : ${signupData.hn}`, `No account with HN: ${signupData.hn}`)
                    );
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
            <ScrollView contentContainerStyle={style.formContainer}>
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
                        blurOnSubmit={false}
                        // keyboardType="number-pad"
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {lang("ชื่อจริง", "First Name (in Thai)")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={firstName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.firstName}
                        onChangeText={(text) => setSignupData({ ...signupData, firstName: text })}
                        onSubmitEditing={() => middleName_ref.current?.focus()}
                        blurOnSubmit={false}
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{lang("ชื่อกลาง", "Middle Name (in Thai)")}</Text>
                    <TextInput
                        ref={middleName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.middleName}
                        onChangeText={(text) => setSignupData({ ...signupData, middleName: text })}
                        onSubmitEditing={() => lastName_ref.current?.focus()}
                        blurOnSubmit={false}
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {lang("นามสกุล", "Last Name (in Thai)")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={lastName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.lastName}
                        onChangeText={(text) => setSignupData({ ...signupData, lastName: text })}
                        onSubmitEditing={() => phone_ref.current?.focus()}
                        blurOnSubmit={false}
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {lang("เบอร์โทรศัพท์", "Phone Number")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={phone_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.phone}
                        onChangeText={(text) => setSignupData({ ...signupData, phone: text })}
                        onSubmitEditing={() => email_ref.current?.focus()}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                        editable={!isLoading}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>
                        {lang("อีเมล", "Email")}
                        <Asterisk />
                    </Text>
                    <TextInput
                        ref={email_ref}
                        style={style.input}
                        value={signupData.email}
                        onChangeText={(text) => setSignupData({ ...signupData, email: text })}
                        keyboardType="email-address"
                        placeholderTextColor={placeholderColor}
                        editable={!isLoading}
                    />
                </View>
                <CustomButton
                    title={lang("ลงทะเบียน", "Sign up")}
                    normalColor="#78ffe6"
                    pressedColor={darkGrey}
                    style={{ height: 60, borderRadius: 10, marginTop: 50 }}
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
