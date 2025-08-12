import { Text, FlatList, View, StyleSheet, Dimensions, Alert } from "react-native";
import { useState, useMemo, useCallback } from "react";
import { ApiDeviceModel, ApiJwtClaimModel, ApiLoginResponse } from "@/model/model";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import LoadingView from "@/components/LoadingView";
import dayjs from "dayjs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { jwtDecode } from "jwt-decode";
import CustomButton from "@/components/CustomButton";
import { darkGrey, tint } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useLanguage } from "@/hooks/useLanguage";
import { getDeviceName, getExpoToken } from "@/hooks/useDeviceInfo";
import useTutorial from "@/hooks/useTutorial";
import { useTranslation } from "react-i18next";

export default function Notification() {
    const [data, setData] = useState<ApiDeviceModel[]>([]);
    const [deviceId, setDeviceId] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);
    const { logoutDispatch, authState } = useAuthContext();
    const { api } = useApiContext();
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const { loginDispatch } = useAuthContext();
    const { setShowAppointmentTutorial, setShowAskTutorial } = useTutorial();
    const fetch = async () => {
        try {
            setIsLoading(true);
            const response = await api.get<any, AxiosResponse<ApiDeviceModel[], any>, any>("/api/device");
            switch (response.status) {
                case 200:
                    setData(response.data);
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${err.code}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    };
    const decodeToken = (token: string) => {
        let id = jwtDecode<ApiJwtClaimModel>(token).deviceId;
        setDeviceId(id);
    };

    useFocusEffect(
        useCallback(() => {
            fetch().then((_) => decodeToken(authState.userToken as string));
        }, [])
    );

    async function handlePushButton() {
        try {
            setIsLoading(true);
            const expoToken = await getExpoToken();
            const deviceName = getDeviceName();
            const response = await api.post<any, AxiosResponse<ApiLoginResponse, any>, any>("/api/device", {
                deviceName: deviceName,
                expoToken: expoToken,
            });
            switch (response.status) {
                case 200:
                    loginDispatch(response.data.token);
                    fetch();
                    decodeToken(response.data.token);
                    setShowAppointmentTutorial(false);
                    setShowAskTutorial(false);
                    break;
                case 401:
                    Alert.alert("Error", "Unauthorized, Invalid token");
                    logoutDispatch();
                    break;
                default:
                    Alert.alert("Something went wrong...", JSON.stringify(response));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                Alert.alert("Request Error", `${err.message ?? ""} ${JSON.stringify(err.response?.data)}`);
            } else {
                Alert.alert("Fatal Error", `${err as Error}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const Item = useMemo(() => {
        return ({ device }: { device: ApiDeviceModel }) => {
            return (
                <View style={style.itemContainer}>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                        <FontAwesome name="circle" size={12} color="green" />
                        {"  "}
                        {device.deviceName}
                        {device.id === deviceId && "(Your device)"}
                    </Text>
                    <Text style={{ flex: 1, textAlign: "center" }}>
                        {dayjs(device.loginAt * 1000).format("D/MM/YYYY HH:mm ")}
                    </Text>
                </View>
            );
        };
    }, [deviceId, currentLang]);

    const canPushButton = data.find((v) => v.id === deviceId) === undefined;

    if (isLoading) return <LoadingView />;

    return (
        <View style={style.container}>
            <View style={style.itemContainer}>
                <Text style={{ flex: 1, textAlign: "center" }}>{t("notification.device_name")}</Text>
                <Text style={{ flex: 1, textAlign: "center" }}>{t("notification.login_at")}</Text>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item device={item} />}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>

            <View style={{ marginTop: 10, padding: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{t("notification.topic1")}</Text>
                <Text>{t("notification.topic2")}</Text>
                <Text style={{ marginTop: 10 }}>{t("notification.factor1")}</Text>
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <CustomButton
                        title={t("notification.make_active")}
                        normalColor={canPushButton ? tint : darkGrey}
                        pressedColor={darkGrey}
                        style={{ height: 50, marginBottom: 20 }}
                        disabled={!canPushButton}
                        onPress={handlePushButton}
                    />
                </View>
                <Text>{t("notification.factor2")}</Text>
                <Text style={{ marginTop: 10 }}>{t("notification.factor3")}</Text>
                <Text style={{ marginTop: 10 }}>{t("notification.factor4")}</Text>
            </View>
        </View>
    );
}
const screenHeight = Dimensions.get("screen").height;
const style = StyleSheet.create({
    container: {
        height: screenHeight * 0.9,
        backgroundColor: "white",
        paddingBottom: 50,
    },
    itemContainer: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 10,
        flexDirection: "row",
        width: "100%",
    },
});
