import { VaccineHistory } from "@/model/model";
import { stringToHslColor } from "@/utility/convert";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { StyleSheet, Pressable, PressableProps, View } from "react-native";
import CustomText from "./CustomText";
import { lFontSize } from "@/constants/Style";

export type VaccineCardProps = { data: VaccineHistory };

export default function VaccineCard({ data, ...rest }: VaccineCardProps & PressableProps) {
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
                <CustomText style={style.title}>{data.vaccineName ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("vaccineCard.location")}</CustomText>
                <CustomText style={style.body}>{data.vaccineLocation ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("vaccineCard.date")}</CustomText>
                <CustomText style={style.body}>{dayjs(data.vaccineAt * 1000).format("D MMMM YYYY")}</CustomText>
                <CustomText style={style.head}>{t("vaccineCard.complication")}</CustomText>
                <CustomText style={style.body}>{data.complication ?? "-"}</CustomText>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    content: {
        padding: 25,
        paddingTop: 10,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: lFontSize,
    },
    head: {
        fontWeight: "bold",
    },
    body: {
        paddingLeft: 10,
    },
});
