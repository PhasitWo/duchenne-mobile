import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { useRef } from "react";
import CustomButton from "@/components/CustomButton";
import { darkGrey } from "@/constants/Colors";
import { useLanguage } from "@/hooks/useLanguage";
import { SignupData, useSignupContext } from "@/hooks/signupContext";

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

export default function Signup() {
    const { signupData, setSignupData } = useSignupContext();
    const { lang, currentLang } = useLanguage();

    const firstName_ref = useRef<TextInput>(null);
    const middleName_ref = useRef<TextInput>(null);
    const lastName_ref = useRef<TextInput>(null);
    const phone_ref = useRef<TextInput>(null);
    const email_ref = useRef<TextInput>(null);

    function validateFields(): keyof SignupData | null {
        const EXCEPTIONFIELDS = ["middleName"];
        let key: keyof SignupData;
        for (key in signupData) {
            if (EXCEPTIONFIELDS.includes(key)) continue;
            if (signupData[key].trim().length === 0) return key;
        }
        return null;
    }

    function handleSignup() {
        const emptyField = validateFields();
        if (emptyField) {
            Alert.alert(
                lang("เกิดข้อผิดพลาด", "Error"),
                lang(`ขาดข้อมูล : ${fieldMap[emptyField][currentLang]}`, `missing : ${fieldMap[emptyField][currentLang]}`)
            );
            return;
        }
        // TODO check signup data in server
    }
    return (
        <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }} behavior="padding">
            <ScrollView contentContainerStyle={style.formContainer}>
                <View style={style.inputContainer}>
                    <Text style={style.label}>HN*</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.hn}
                        onChangeText={(text) => setSignupData({ ...signupData, hn: text })}
                        onSubmitEditing={() => firstName_ref.current?.focus()}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{lang("ชื่อจริง*", "First Name* (in Thai)")}</Text>
                    <TextInput
                        ref={firstName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.firstName}
                        onChangeText={(text) => setSignupData({ ...signupData, firstName: text })}
                        onSubmitEditing={() => middleName_ref.current?.focus()}
                        blurOnSubmit={false}
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
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{lang("นามสกุล*", "Last Name* (in Thai)")}</Text>
                    <TextInput
                        ref={lastName_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.lastName}
                        onChangeText={(text) => setSignupData({ ...signupData, lastName: text })}
                        onSubmitEditing={() => phone_ref.current?.focus()}
                        blurOnSubmit={false}
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{lang("เบอร์โทรศัพท์*", "Phone Number*")}</Text>
                    <TextInput
                        ref={phone_ref}
                        style={style.input}
                        placeholderTextColor={placeholderColor}
                        value={signupData.phone}
                        onChangeText={(text) => setSignupData({ ...signupData, phone: text })}
                        onSubmitEditing={() => email_ref.current?.focus()}
                        blurOnSubmit={false}
                        keyboardType="number-pad"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={style.label}>{lang("อีเมล*", "Email*")}</Text>
                    <TextInput
                        ref={email_ref}
                        style={style.input}
                        value={signupData.email}
                        onChangeText={(text) => setSignupData({ ...signupData, email: text })}
                        keyboardType="email-address"
                        placeholderTextColor={placeholderColor}
                    />
                </View>
                <CustomButton
                    title={lang("ลงทะเบียน", "Sign up")}
                    normalColor="#78ffe6"
                    pressedColor={darkGrey}
                    style={{ height: 60, borderRadius: 10, marginTop: 50 }}
                    onPress={handleSignup}
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
});
