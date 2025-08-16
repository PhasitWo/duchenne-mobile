import { View, ScrollView, Alert, RefreshControl, FlatList } from "react-native";
import Card from "@/components/Card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { ApiContentModel } from "@/model/model";
import { useAuthContext } from "@/hooks/authContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContentStackParamList } from "./_stack";
import { color } from "@/constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import CustomText from "@/components/CustomText";
import { isTablet } from "@/constants/Style";

type props = NativeStackScreenProps<ContentStackParamList, "index">;
export default function Content({ navigation }: props) {
    const [isLoading, setIsLoading] = useState(false);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const [contents, setContents] = useState<ApiContentModel[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const { t } = useTranslation();

    useEffect(() => {
        fetch();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetch();
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }, [contents])
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
                    Alert.alert(t("common.alert.error"), t("common.alert.401"));
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
                alignItems: "center",
                flex: 1,
                backgroundColor: color.base,
            }}
        >
            {contents.length === 0 && <CustomText style={{ marginTop: 10 }}>{t("common.no_data")}</CustomText>}
            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
                data={contents.concat(contents).concat(contents)}
                numColumns={isTablet ? 2 : 1}
                columnWrapperStyle={isTablet && { gap: 50 }}
                renderItem={({ index, item }) => (
                    <Card
                        key={index}
                        title={item.title}
                        imageURL={item.coverImageURL || undefined}
                        onPress={() =>
                            navigation.navigate("viewContent", {
                                id: String(item.id),
                            })
                        }
                    />
                )}
            />
        </View>
    );
}
