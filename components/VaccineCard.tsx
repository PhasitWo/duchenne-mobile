import { useLanguage } from "@/hooks/useLanguage";
import { VaccineHistory } from "@/model/model";
import { stringToHslColor } from "@/utility/convert";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, Pressable, PressableProps, View } from "react-native";

export type VaccineCardProps = { data: VaccineHistory };

export default function VaccineCard({ data, ...rest }: VaccineCardProps & PressableProps) {
    const { currentLang } = useLanguage();
    const { t } = useTranslation();
    return (
        <Pressable {...rest} style={style.container}>
            <View
                style={{
                    backgroundColor: stringToHslColor(data.vaccineName),
                    height: 10,
                    width: "100%",
                    alignSelf: "center",
                }}
            />
            <View style={style.content}>
                <Text style={style.title}>{data.vaccineName ?? "-"}</Text>
                <Text style={style.head}>{t("vaccineCard.location")}</Text>
                <Text style={style.body}>{data.vaccineLocation ?? "-"}</Text>
                <Text style={style.head}>{t("vaccineCard.date")}</Text>
                <Text style={style.body}>
                    {dayjs(data.vaccineAt * 1000)
                        .locale(currentLang)
                        .format("D MMMM YYYY")}
                </Text>
                <Text style={style.head}>{t("vaccineCard.complication")}</Text>
                <Text style={style.body}>{data.complication ?? "-"}</Text>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        minHeight: 200,
        marginTop: 20,
        backgroundColor: "white",
        overflow: "hidden",
        display: "flex",
        filter: "drop-shadow(2px 4px 3px rgba(0,0,0,0.1))",
    },
    content: {
        padding: 25,
        paddingTop: 10,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 18,
    },
    head: {
        fontWeight: "bold",
    },
    body: {
        paddingLeft: 10,
    },
});
