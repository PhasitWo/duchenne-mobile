import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { SignupStackParamList } from "./_stack";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
import { lFontSize, mdFontSize } from "@/constants/Style";
import CustomText from "@/components/CustomText";

type Props = NativeStackScreenProps<SignupStackParamList, "index">;
export default function Consent({ navigation }: Props) {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 20, alignItems: "center" }}>
            <CustomText style={style.header}>{t("consent.term")}</CustomText>
            <CustomText style={style.body}>{t("consent.consent_body")}</CustomText>
            <CustomText style={[style.header, { marginTop: 30 }]}>{t("privacy.title")}</CustomText>
            <CustomText style={style.body}>{t("consent.privacy_intro")}</CustomText>
            <CustomText style={[style.body, { marginTop: 10, alignSelf: "flex-start" }]}>
                {t("consent.privacy_pointer")}
            </CustomText>
            <CustomText
                style={[style.body, { color: "blue", alignSelf: "flex-start", textDecorationLine: "underline" }]}
                onPress={() => navigation.navigate("privacy")}
            >
                {t("privacy.title")}
            </CustomText>
            <CustomButton
                title={t("consent.accept")}
                normalColor={color.tint}
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                bold
                onPress={() => navigation.navigate("signup1")}
            />
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 15,
        fontSize: lFontSize,
    },
    body: {
        fontSize: mdFontSize,
    },
});
