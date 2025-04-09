import { View, ScrollView, Alert, RefreshControl } from "react-native";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiContentModel } from "@/model/model";
import { useAuthContext } from "@/hooks/authContext";
import { useLanguage } from "@/hooks/useLanguage";
import dayjs from "dayjs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContentStackParamList } from "./_stack";

type props = NativeStackScreenProps<ContentStackParamList, "index">;
export default function Content({ navigation }: props) {
    const { currentLang } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const [contents, setContents] = useState<ApiContentModel[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiContentModel[], any>, any>("/api/content?isPublished");
            switch (response.status) {
                case 200:
                    setContents(response.data);
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
            setContents([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
            >
                {contents.map((v, k) => (
                    <Card
                        key={k}
                        title={v.title}
                        bodyText={dayjs(1000 * v.createAt)
                            .locale(currentLang)
                            .format("D MMMM YYYY")}
                        onPress={() => navigation.navigate("viewContent", { id: String(v.id) })}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
