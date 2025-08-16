import { View, Alert, StyleSheet, Pressable, RefreshControl, ScrollView, FlatList } from "react-native";
import QuestionCard, { QuestionTopic } from "@/components/QuestionCard";
import { useLanguage } from "@/hooks/useLanguage";
import { color, darkGrey } from "@/constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AskStackParamList } from "./_stack";
import { useCallback, useRef, useState } from "react";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthContext } from "@/hooks/authContext";
import { ApiQuestionTopicModel } from "@/model/model";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Tutorial from "@/components/Tutorial";
import CustomText from "@/components/CustomText";
import { isTablet } from "@/constants/Style";

type props = NativeStackScreenProps<AskStackParamList, "index">;
export default function Ask({ navigation }: props) {
    const [topicList, setTopicList] = useState<QuestionTopic[]>([]);
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const scrollViewRef = useRef<ScrollView>(null);

    // fetch data on focus
    useFocusEffect(
        useCallback(() => {
            fetch();
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }, [currentLang])
    );

    const fetch = async () => {
        setIsLoading(true);
        try {
            const response = await api.get<any, AxiosResponse<ApiQuestionTopicModel[], any>, any>("/api/question");
            switch (response.status) {
                case 200:
                    setTopicList(
                        response.data.map((v) => ({
                            id: v.id,
                            title: v.topic,
                            unixTime: v.answerAt ? v.answerAt : v.createAt,
                            hasReply: Boolean(v.answerAt),
                        }))
                    );
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
            setTopicList([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <Tutorial from={50} to={350} />
            {topicList.length === 0 && <CustomText style={{ marginTop: 10 }}>{t("common.no_data")}</CustomText>}
            <FlatList
                contentContainerStyle={{ paddingBottom: 200 }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetch} />}
                numColumns={isTablet ? 2 : 1}
                columnWrapperStyle={isTablet && { gap: 50 }}
                data={topicList}
                renderItem={({ index, item }) => (
                    <QuestionCard
                        key={index}
                        questionTopic={item}
                        onPress={() =>
                            navigation.navigate("viewAsk", {
                                id: item.id as number,
                            })
                        }
                    />
                )}
            ></FlatList>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? darkGrey : "white" }, style.button]}
                onPress={() => navigation.navigate("addAsk" as never)}
            >
                <CustomText>{t("ask.submit")}</CustomText>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    container: { justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: color.base },
    button: {
        height: 50,
        width: "auto",
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 100,
        position: "absolute",
        bottom: 40,
        right: 20,
        shadowRadius: 2,
        shadowColor: color.tint,
        shadowOpacity: 0.5,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        borderColor: color.tint,
        borderWidth: 1,
    },
});
