import { View, ScrollView, Alert, RefreshControl } from "react-native";
import Card from "@/components/Card";
import { useCallback, useEffect, useState } from "react";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiContentModel } from "@/model/model";
import { useAuthContext } from "@/hooks/authContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContentStackParamList } from "./_stack";
import { color } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

type props = NativeStackScreenProps<ContentStackParamList, "index">;
export default function Content({ navigation }: props) {
    const [isLoading, setIsLoading] = useState(true);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const [contents, setContents] = useState<ApiContentModel[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetch();
        }, [])
    );

    const fetch = async () => {
        if (contents.length > 0) return;
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
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                backgroundColor: color.base,
            }}
        >
            <ScrollView
                contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
            >
                {contents.map((v, k) => (
                    <Card
                        key={k}
                        title={v.title}
                        imageURL={v.coverImageURL || undefined}
                        // bodyText={dayjs(1000 * v.createAt)
                        //     .locale(currentLang)
                        //     .format("D MMMM YYYY")}
                        onPress={() =>
                            navigation.navigate("viewContent", {
                                id: String(v.id),
                            })
                        }
                    />
                ))}
            </ScrollView>
        </View>
    );
}
