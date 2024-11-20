import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { darkGrey } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ChangeLangText from "@/components/ChangeLangText";
import { useLanguage } from "@/hooks/useLanguage";
import { useAuthContext } from "@/hooks/authContext";

type LoginData = {
    hn: string;
    password: string;
    hide: boolean;
};

export default function Login() {
    const [data, setData] = useState<LoginData>({ hn: "", password: "", hide: true });
    const navigation = useNavigation();
    const { lang } = useLanguage();
    const { login } = useAuthContext();
    function handleLogin() {
        // TODO POST TO SERVER
        login(data);
    }
    return (
        <View style={style.formContainer}>
            <View style={style.inputContainer}>
                <Text style={style.label}>HN</Text>
                <TextInput style={style.input} placeholderTextColor={placeholderColor} />
            </View>
            <View style={style.inputContainer}>
                <Text style={style.label}>{lang("รหัสผ่าน", "Password")}</Text>
                <TextInput style={style.input} placeholderTextColor={placeholderColor} secureTextEntry={data.hide} />
                <Pressable style={style.eye} onPress={() => setData({ ...data, hide: !data.hide })}>
                    <FontAwesome5 name={data.hide ? "eye-slash" : "eye"} size={15} color="black" />
                </Pressable>
            </View>
            <View style={style.forgotPasswordContainer}>
                <Text style={style.forgotPassword}>{lang("ลืมรหัสผ่าน?", "Forgot password?")}</Text>
            </View>
            <CustomButton
                title={lang("เข้าสู่ระบบ", "Log in")}
                normalColor="#78ffe6"
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                onPress={handleLogin}
            />
            <Text style={style.signup}>
                {lang("ยังไม่มีบัญชี? ", "Don't have an account? ")}
                <Text style={style.signupLink} onPress={() => navigation.navigate("register" as never)}>
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
        position: "absolute",
        bottom: 50,
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
