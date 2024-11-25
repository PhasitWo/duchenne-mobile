import { View, Text, StyleSheet, TextInput } from "react-native";
import { useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { darkGrey, tint } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import ChangeLangText from "@/components/ChangeLangText";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuthContext, type LoginData } from "@/hooks/authContext";

type Warning = {
    hn: boolean;
    firstName: boolean;
    lastName: boolean;
};

export default function Login() {
    const [data, setData] = useState<LoginData>({ hn: "", firstName: "", lastName: "" });
    const [warning, setWarning] = useState<Warning>({ hn: false, firstName: false, lastName: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation();
    const { lang } = useLanguage();
    const { login } = useAuthContext();

    const firstName_ref = useRef<TextInput>(null);
    const lastName_ref = useRef<TextInput>(null);
    const warningText = lang("กรุณากรอกข้อมูล", "This field is required");

    function handleLogin() {
        // validate Field
        let key: keyof LoginData;
        for (key in data) {
            if (data[key].trim().length === 0) {
                setWarning({ ...warning, [key]: true });
                return;
            }
        }
        setIsLoading(true);
        login(data);
    }
    return (
        <View style={style.formContainer}>
            <View style={style.inputContainer}>
                <Text style={[style.label, { color: warning.hn ? "red" : "black" }]}>HN</Text>
                <TextInput
                    style={[style.input, { borderColor: warning.hn ? "red" : darkGrey }]}
                    value={data.hn}
                    onChangeText={(text) => {
                        setWarning({ ...warning, hn: false });
                        setData({ ...data, hn: text });
                    }}
                    onSubmitEditing={() => firstName_ref.current?.focus()}
                    returnKeyType="next"
                    editable={!isLoading}
                    placeholder={warning.hn ? warningText : undefined}
                    placeholderTextColor="red"
                    blurOnSubmit={false}
                />
            </View>
            <View style={style.inputContainer}>
                <Text style={[style.label, { color: warning.firstName ? "red" : "black" }]}>
                    {lang("ชื่อจริง", "First Name")}
                </Text>
                <TextInput
                    ref={firstName_ref}
                    style={[style.input, { borderColor: warning.firstName ? "red" : darkGrey }]}
                    value={data.firstName}
                    onChangeText={(text) => {
                        setWarning({ ...warning, firstName: false });
                        setData({ ...data, firstName: text });
                    }}
                    onSubmitEditing={() => lastName_ref.current?.focus()}
                    returnKeyType="next"
                    editable={!isLoading}
                    placeholder={warning.firstName ? warningText : undefined}
                    placeholderTextColor="red"
                    blurOnSubmit={false}
                />
            </View>
            <View style={style.inputContainer}>
                <Text style={[style.label, { color: warning.lastName ? "red" : "black" }]}>{lang("นามสกุล", "Last Name")}</Text>
                <TextInput
                    ref={lastName_ref}
                    style={[style.input, { borderColor: warning.lastName ? "red" : darkGrey }]}
                    value={data.lastName}
                    onChangeText={(text) => {
                        setWarning({ ...warning, lastName: false });
                        setData({ ...data, lastName: text });
                    }}
                    editable={!isLoading}
                    placeholder={warning.lastName ? warningText : undefined}
                    placeholderTextColor="red"
                />
            </View>
            <View style={style.forgotPasswordContainer}>
                <Text
                    style={style.forgotPassword}
                    onPress={() => navigation.navigate("forgotPassword" as never)}
                    disabled={isLoading}
                >
                    {lang("ลืมรหัสผ่าน?", "Forgot password?")}
                </Text>
            </View>
            <CustomButton
                title={lang("เข้าสู่ระบบ", "Log in")}
                normalColor="#78ffe6"
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                onPress={handleLogin}
                showLoading={isLoading}
            />
            <Text style={style.signup}>
                {lang("ยังไม่มีบัญชี? ", "Don't have an account? ")}
                <Text style={style.signupLink} onPress={() => navigation.navigate("register" as never)} disabled={isLoading}>
                    {lang("ลงทะเบียน", "Sign up")}
                </Text>
            </Text>
            <Text onPress={() => navigation.navigate("tab" as never)} style={{ bottom: -100, color: "whitesmoke" }}>
                DEV
            </Text>
            <ChangeLangText style={style.lang} />
        </View>
    );
}

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
        margin: 5,
        padding: 5,
    },
    signup: { marginTop: 20 },
    signupLink: {
        color: "blue",
        borderBottomColor: "blue",
        borderBottomWidth: 5,
    },
    eye: {
        position: "absolute",
        right: 0,
        bottom: 0,
        padding: 20,
    },
    lang: {
        marginTop: 200,
    },
    forgotPasswordContainer: {
        justifyContent: "center",
        width: 350,
        alignItems: "flex-end",
    },
    forgotPassword: {
        color: "blue",
    },
});
