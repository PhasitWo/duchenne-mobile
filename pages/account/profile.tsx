import { Text, View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { darkGrey } from "@/constants/Colors";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { ApiPatientModel } from "@/model/model";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import LoadingView from "@/components/LoadingView";
import { useTranslation } from "react-i18next";

type Info = { title: string; value: string | number | undefined; border?: boolean };

const Item = ({ info }: { info: Info }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? darkGrey : "white",
                    borderTopWidth: info.border ? 1 : 0,
                },
                style.itemContainer,
            ]}
        >
            <View style={style.item}>
                <Text style={style.itemTitle}>{info.title}</Text>
                <Text style={style.itemValue}>{info.value}</Text>
            </View>
        </Pressable>
    );
};

export default function Profile() {
    const { currentLang } = useLanguage();
    const { t }= useTranslation() ;
    const [userInfo, setUserInfo] = useState<ApiPatientModel>();
    const data = useMemo<Info[]>(() => {
        return [
            { title: t("profile.firstName"), value: userInfo?.firstName },
            { title: t("profile.middleName"), value: userInfo?.middleName ?? "-" },
            { title: t("profile.lastName"), value: userInfo?.lastName },
            { title: t("profile.hn"), value: userInfo?.hn },
            { title: t("profile.email"), value: userInfo?.email ?? "-" },
            { title: t("profile.phone"), value: userInfo?.phone ?? "-" },
            { title: t("profile.weight"), value: userInfo?.weight ?? "-" },
            { title: t("profile.height"), value: userInfo?.height ?? "-" },
        ];
    }, [currentLang, userInfo]);

    // fetch
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const fetch = async () => {
        try {
            const response = await api.get<any, AxiosResponse<ApiPatientModel, any>, any>("/api/profile");
            switch (response.status) {
                case 200:
                    setUserInfo(response.data);
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
    useEffect(() => {
        fetch();
    }, []);

    if (isLoading) return <LoadingView />;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList
                style={{ backgroundColor: "white" }}
                data={data}
                renderItem={({ item }) => <Item info={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const style = StyleSheet.create({
    itemContainer: {
        height: 100,
        justifyContent: "space-between",
        borderTopColor: darkGrey,
        alignItems: "flex-start",
        paddingLeft: 30,
        paddingRight: 30,
    },
    item: {
        flex: 1,
        justifyContent: "center",
        rowGap: 10,
    },
    itemTitle: { fontWeight: "bold" },
    itemValue: {},
});
