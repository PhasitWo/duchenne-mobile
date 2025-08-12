import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    Platform,
    Image,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { useRef, useState, useCallback } from "react";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import { useAuthContext } from "@/hooks/authContext";
import { AxiosError, AxiosResponse } from "axios";
import { useApiContext } from "@/hooks/apiContext";
import type { ApiLoginResponse } from "@/model/model";
import type { AppStackParamList } from "@/app";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Linking from "expo-linking";
import { startActivityAsync, ActivityAction } from "expo-intent-launcher";
import * as Application from "expo-application";
import { getExpoToken } from "@/hooks/useDeviceInfo";
import { useTranslation } from "react-i18next";

export type LoginData = {
    hn: string;
    pin: string;
};

type Warning = Record<keyof LoginData, boolean>;

type Props = NativeStackScreenProps<AppStackParamList, "login">;
export default function Login({ route, navigation }: Props) {
    const [data, setData] = useState<LoginData>({ hn: "", pin: "" });
    const [warning, setWarning] = useState<Warning>({ hn: false, pin: false });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const { loginDispatch, getLastLoginHN } = useAuthContext();

    const pin_ref = useRef<TextInput>(null);
    const warningText = t("login.warn_require_field");

    // route param is used once, when the screen is focused
    useFocusEffect(
        useCallback(() => {
            if (route.params) setData(route.params);
            getLastLoginHN().then((v) => {
                if (v) setData({ ...data, hn: v });
            });
        }, [route.params])
    );

    async function getNotificationPermission() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return false;
        }
        return true;
    }

    const { apiNoAuth } = useApiContext();
    async function handleLogin() {
        setIsLoading(true);
        try {
            // validate Field
            let key: keyof LoginData;
            for (key in data) {
                if (data[key].trim().length === 0) {
                    setWarning({ ...warning, [key]: true });
                    return;
                }
            }
            // notification permission
            if (!(await getNotificationPermission()))
                Alert.alert(t("common.alert.error"), t("login.alert.require_noti_perm"), [
                    {
                        text: "Ok",
                        onPress: openNotificationSetting,
                    },
                ]);
            // EXPO TOKEN
            let expoToken = await getExpoToken();
            if (!expoToken) {
                Alert.alert(t("common.alert.error"), t("login.alert.expo_error"));
                return;
            }
            // POST
            const hn = data.hn.trim();
            const response = await apiNoAuth.post<any, AxiosResponse<ApiLoginResponse, any>, any>(
                "/auth/login",
                {
                    hn: hn,
                    pin: data.pin,
                    deviceName: Device.deviceName ? Device.deviceName : "Unknown Device",
                    expoToken: expoToken,
                },
                { timeout: 5000 }
            );
            switch (response.status) {
                case 200:
                    loginDispatch(response.data.token, hn);
                    break;
                case 401:
                    Alert.alert(t("common.alert.error"), t("login.alert.invalid_cred"));
                    break;
                case 403:
                    Alert.alert(t("common.alert.error"), t("login.alert.unverified_account", { hn: data.hn }));
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.status == 404) {
                    Alert.alert(t("common.alert.error"), t("login.alert.404", { hn: data.hn }));
                    return;
                }
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView style={style.formContainer} behavior="padding">
            <ScrollView contentContainerStyle={{ alignItems: "center" }} keyboardShouldPersistTaps="handled">
                <Image source={require("@/assets/images/logo.png")} style={{ width: 200, height: 200 }}></Image>
                <View style={style.inputContainer}>
                    <Text style={[style.label, { color: warning.hn ? "red" : "black" }]}>HN</Text>
                    <TextInput
                        style={[style.input, { borderColor: warning.hn ? "red" : darkGrey }]}
                        value={data.hn}
                        onChangeText={(text) => {
                            setWarning({ ...warning, hn: false });
                            setData({ ...data, hn: text });
                        }}
                        onSubmitEditing={() => pin_ref.current?.focus()}
                        returnKeyType="next"
                        editable={!isLoading}
                        placeholder={warning.hn ? warningText : undefined}
                        placeholderTextColor="red"
                        submitBehavior="submit"
                    />
                </View>
                <View style={style.inputContainer}>
                    <Text style={[style.label, { color: warning.pin ? "red" : "black" }]}>{t("login.password")}</Text>
                    <TextInput
                        ref={pin_ref}
                        style={[style.input, { borderColor: warning.pin ? "red" : darkGrey }]}
                        value={data.pin}
                        onChangeText={(text) => {
                            setWarning({ ...warning, pin: false });
                            setData({ ...data, pin: text });
                        }}
                        secureTextEntry
                        keyboardType="number-pad"
                        returnKeyType="done"
                        editable={!isLoading}
                        placeholder={warning.pin ? warningText : undefined}
                        placeholderTextColor="red"
                        maxLength={6}
                    />
                </View>
                <View style={style.forgotPasswordContainer}>
                    <Text
                        style={style.forgotPassword}
                        onPress={() => navigation.navigate("contact" as never)}
                        disabled={isLoading}
                    >
                        {t("login.forgot")}
                    </Text>
                </View>
                <CustomButton
                    title={t("login.login")}
                    normalColor={color.tint}
                    pressedColor={darkGrey}
                    style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                    bold
                    onPress={handleLogin}
                    showLoading={isLoading}
                />
                <Text style={style.signup}>
                    {t("login.no_account") + " "}
                    <Text
                        style={style.signupLink}
                        onPress={() => navigation.navigate("signupStack")}
                        disabled={isLoading}
                    >
                        {t("login.signup")}
                    </Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 10,
    },
    inputContainer: {
        width: 350,
        height: 70,
        justifyContent: "center",
        marginTop: 20,
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
        color: "black",
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

async function openNotificationSetting() {
    if (Platform.OS == "android") {
        startActivityAsync(ActivityAction.APP_NOTIFICATION_SETTINGS, {
            extra: { "android.provider.extra.APP_PACKAGE": Application.applicationId },
        });
    } else {
        Linking.openSettings();
    }
}
