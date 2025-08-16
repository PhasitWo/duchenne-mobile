import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, ScrollView } from "react-native";
import { SignupStackParamList } from "./_stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { lFontSize, mdFontSize } from "@/constants/Style";
import CustomText from "@/components/CustomText";

type Props = NativeStackScreenProps<SignupStackParamList, "privacy">;
export default function Privacy({ navigation }: Props) {
    const { t } = useTranslation();
    const { bottom } = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "white", padding: 20 }}
            contentContainerStyle={{ paddingBottom: bottom + 50 }}
        >
            <CustomText style={[style.header, { marginTop: 0 }]}>{t("privacy.privacy_policy_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.privacy_policy_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.personal_data_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.personal_data_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.collect_data_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.collect_data_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.source_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.source_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.process_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.process_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.transfer_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.transfer_body")}</CustomText>
            {t("privacy.overseas_header") && (
                <CustomText style={style.header}>{t("privacy.overseas_header")}</CustomText>
            )}
            {t("privacy.overseas_header") && <CustomText style={style.body}>{t("privacy.overseas_body")}</CustomText>}
            <CustomText style={style.header}>{t("privacy.protection_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.protection_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.duration_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.duration_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.changes_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.changes_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.right_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.right_body")}</CustomText>
            <CustomText style={style.header}>{t("privacy.contact_header")}</CustomText>
            <CustomText style={style.body}>{t("privacy.contact_body")}</CustomText>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    header: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 15,
        marginTop: 30,
        fontSize: lFontSize,
    },
    body: {
        fontSize: mdFontSize,
    },
});
