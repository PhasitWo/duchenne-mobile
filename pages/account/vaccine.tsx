import { View, FlatList, Alert, Text } from "react-native";
import { useEffect, useState } from "react";
import type { ApiPatientModel, VaccineHistory } from "@/model/model";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import LoadingView from "@/components/LoadingView";
import VaccineCard from "@/components/VaccineCard";
import { useLanguage } from "@/hooks/useLanguage";

export default function Vaccine() {
    const [data, setData] = useState<VaccineHistory[] | null>([]);
    const { lang } = useLanguage();

    // fetch
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const fetch = async () => {
        try {
            const response = await api.get<any, AxiosResponse<ApiPatientModel, any>, any>("/api/profile");
            switch (response.status) {
                case 200:
                    setData(response.data.vaccineHistory);
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
        <View>
            {data?.length === 0 && (
                <Text style={{ marginTop: 10, alignSelf: "center" }}>{lang("ไม่พบข้อมูล", "No data")}</Text>
            )}
            <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                data={data}
                renderItem={({ item }) => <VaccineCard data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
