import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, StyleSheet, ScrollView } from "react-native";
import { SignupStackParamList } from "./_stack";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<SignupStackParamList, "privacy">;
export default function Privacy({ navigation }: Props) {
    const { t } = useTranslation();
    const { bottom } = useSafeAreaInsets();
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "white", padding: 20 }}
            contentContainerStyle={{ paddingBottom: bottom + 20 }}
        >
            <Text style={[style.header, { marginTop: 0 }]}>{t("privacy.privacy_policy_header")}</Text>
            <Text style={style.body}>{t("privacy.privacy_policy_body")}</Text>
            <Text style={style.header}>{t("privacy.personal_data_header")}</Text>
            <Text style={style.body}>{t("privacy.personal_data_body")}</Text>
            <Text style={style.header}>{t("privacy.collect_data_header")}</Text>
            <Text style={style.body}>{t("privacy.collect_data_body")}</Text>
            <Text style={style.header}>{t("privacy.source_header")}</Text>
            <Text style={style.body}>{t("privacy.source_body")}</Text>
            <Text style={style.header}>{t("privacy.process_header")}</Text>
            <Text style={style.body}>{t("privacy.process_body")}</Text>
            <Text style={style.header}>{t("privacy.transfer_header")}</Text>
            <Text style={style.body}>{t("privacy.transfer_body")}</Text>
            {t("privacy.overseas_header") && <Text style={style.header}>{t("privacy.overseas_header")}</Text>}
            {t("privacy.overseas_header") && <Text style={style.body}>{t("privacy.overseas_body")}</Text>}
            <Text style={style.header}>{t("privacy.protection_header")}</Text>
            <Text style={style.body}>{t("privacy.protection_body")}</Text>
            <Text style={style.header}>{t("privacy.duration_header")}</Text>
            <Text style={style.body}>{t("privacy.duration_body")}</Text>
            <Text style={style.header}>{t("privacy.changes_header")}</Text>
            <Text style={style.body}>{t("privacy.changes_body")}</Text>
            <Text style={style.header}>{t("privacy.right_header")}</Text>
            <Text style={style.body}>{t("privacy.right_body")}</Text>
            <Text style={style.header}>{t("privacy.contact_header")}</Text>
            <Text style={style.body}>{t("privacy.contact_body")}</Text>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    header: {
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 15,
        marginTop: 30,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
});
