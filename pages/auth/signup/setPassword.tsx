import { View, Text, StyleSheet, TextInput, Alert, Pressable } from "react-native";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { darkGrey } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useLanguage } from "@/hooks/useLanguage";

type Password = {
    password: string;
    confirmPassword: string;
    hide: boolean;
};

type Condition = {
    length: boolean;
    lowerCase: boolean;
    upperCase: boolean;
    numeric: boolean;
};

const engRegex = /^[A-Za-z0-9]*$/;

export default function SetPassword() {
    const [password, setPassword] = useState<Password>({ password: "", confirmPassword: "", hide: true });
    const [condition, setCondition] = useState<Condition>({ length: false, lowerCase: false, upperCase: false, numeric: false });
    const { lang } = useLanguage();

    const conditionCheck = (text: string) => {
        text = text.trim();
        if (!engRegex.test(text)) return; // english only
        let newCondition: Condition = { length: false, lowerCase: false, upperCase: false, numeric: false };
        newCondition.length = text.length >= 8 && text.length <= 20;
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            if (!isNaN((char as any) * 1)) newCondition.numeric = true;
            else if (char === char.toLowerCase()) newCondition.lowerCase = true;
            else if (char === char.toUpperCase()) newCondition.upperCase = true;
        }
        setCondition(newCondition);
        setPassword({ ...password, password: text });
    };

    function handleSubmit() {
        if (!(condition.length && condition.lowerCase && condition.upperCase && condition.numeric)) {
            Alert.alert(
                lang("เกิดข้อผิดพลาด", "Error"),
                lang("รหัสผ่านไม่ตรงกับเกณฑ์ที่กำหนด", "The password does not meet the requirements.")
            );
            return;
        }
        if (password.password !== password.confirmPassword) {
            Alert.alert(lang("เกิดข้อผิดพลาด", "Error"), lang("รหัสผ่านไม่ตรงกัน", "The password confirmation do not match."));
            return;
        }
        // TODO POST TO SERVER
    }

    return (
        <View style={style.formContainer}>
            <View style={style.inputContainer}>
                <Text style={style.label}>{lang("ตั้งรหัสผ่าน", "Password")}</Text>
                <TextInput
                    style={style.input}
                    secureTextEntry={password.hide}
                    value={password.password}
                    onChangeText={conditionCheck}
                />
                <Pressable style={style.eye} onPress={() => setPassword({ ...password, hide: !password.hide })}>
                    <FontAwesome5 name={password.hide ? "eye-slash" : "eye"} size={15} color="black" />
                </Pressable>
            </View>
            <View style={style.inputContainer}>
                <Text style={style.label}>{lang("ยืนยันรหัสผ่าน", "Confirm Password")}</Text>
                <TextInput
                    style={style.input}
                    secureTextEntry
                    value={password.confirmPassword}
                    onChangeText={(text) => setPassword({ ...password, confirmPassword: text.trim() })}
                />
            </View>
            <View>
                <Text style={{ color: condition.length ? "green" : "red" }}>
                    {lang("รหัสผ่านต้องมีความยาวอย่างน้อย 8-20 ตัวอักษร", "Passwords must be between 8-20 characters in length")}
                </Text>
                <Text style={{ color: condition.lowerCase ? "green" : "red" }}>
                    {lang("ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัวอักษร [a-z]", "a minimum of 1 lower case letter [a-z]")}
                </Text>
                <Text style={{ color: condition.upperCase ? "green" : "red" }}>
                    {lang("ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัวอักษร [A-Z]", "a minimum of 1 upper case letter [A-Z]")}
                </Text>
                <Text style={{ color: condition.numeric ? "green" : "red" }}>
                    {lang("ต้องมีตัวเลขอย่างน้อย 1 ตัว [0-9]", "a minimum of 1 numeric character [0-9]")}
                </Text>
            </View>
            <CustomButton
                title={lang("ลงทะเบียน", "Submit")}
                normalColor="#78ffe6"
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 50 }}
                onPress={handleSubmit}
            />
        </View>
    );
}

function hasLowerCase(text: string) {
    for (let i = 0; i < text.length; i++) {}
}

const placeholderColor = darkGrey;
const style = StyleSheet.create({
    formContainer: {
        flex: 1,
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
    passwordCondition: {},
    eye: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 20,
    },
});
