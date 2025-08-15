import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContentStackParamList } from "./_stack";
import { StyleSheet, View, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { useEffect, useState } from "react";
import { ApiContentModel } from "@/model/model";
import LoadingView from "@/components/LoadingView";
import { useApiContext } from "@/hooks/apiContext";
import { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "@/hooks/authContext";

type props = NativeStackScreenProps<ContentStackParamList, "viewContent">;
export default function ViewContent({ navigation, route }: props) {
    const [content, setContent] = useState<ApiContentModel | null>(null);
    const { api } = useApiContext();
    const { logoutDispatch } = useAuthContext();
    const { t } = useTranslation();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        try {
            const response = await api.get<any, AxiosResponse<ApiContentModel, any>, any>(
                `/api/content/${route.params.id}`
            );
            switch (response.status) {
                case 200:
                    setContent(response.data);
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
            navigation.navigate("index");
        }
    };
    return (
        <View style={style.container}>
            <View style={style.contentContainer}>
                {content ? (
                    <WebView originWhitelist={["*"]} source={{ html: header + content.body }} allowsFullscreenVideo />
                ) : (
                    <LoadingView />
                )}
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {},
    contentContainer: {
        backgroundColor: "white",
        width: "100%",
        minHeight: "100%",
        paddingBottom: 50,
    },
});

const header = `
<meta name="viewport" content="width=device-width, initial-scale=1" />
<head>
<style>
.ql-align-center {
  text-align: center !important;
}

.ql-align-left {
  text-align: left !important;
}

.ql-align-right {
  text-align: right !important;
}

.ql-align-justify {
  text-align: justify !important;
}

.ql-video {
  display: block;
  max-width: 100%;
}

.ql-video.ql-align-center {
  margin: 0 auto;
}


</style>
</head>
`;
