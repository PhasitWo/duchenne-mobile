import { Medicine } from "@/model/model";
import { stringToHslColor } from "@/utility/convert";
import { useTranslation } from "react-i18next";
import { StyleSheet, Pressable, PressableProps, View } from "react-native";
import CustomText from "./CustomText";
import { lFontSize } from "@/constants/Style";

export type MedicineCardProps = { data: Medicine };

export default function MedicineCard({ data, ...rest }: MedicineCardProps & PressableProps) {
    const { t } = useTranslation();
    return (
        <Pressable {...rest} style={style.container}>
            <View
                style={{
                    backgroundColor: stringToHslColor(data.medicineName),
                    height: 10,
                    width: "100%",
                    alignSelf: "center",
                }}
            />
            <View style={style.content}>
                <CustomText style={style.title}>{data.medicineName ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("medicineCard.dose")}</CustomText>
                <CustomText style={style.body}>{data.dose ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("medicineCard.quantity")}</CustomText>
                <CustomText style={style.body}>{data.quantity ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("medicineCard.frequency")}</CustomText>
                <CustomText style={style.body}>{data.frequencyPerDay ?? "-"}</CustomText>
                <CustomText style={style.head}>{t("medicineCard.instruction")}</CustomText>
                <CustomText style={style.body}>{data.instruction ?? "-"}</CustomText>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        minHeight: 250,
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
