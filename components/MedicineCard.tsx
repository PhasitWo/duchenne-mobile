import { Medicine } from "@/model/model";
import { stringToHslColor } from "@/utility/convert";
import { useTranslation } from "react-i18next";
import { Text, StyleSheet, Pressable, PressableProps, View } from "react-native";

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
                <Text style={style.title}>{data.medicineName ?? "-"}</Text>
                <Text style={style.head}>{t("medicineCard.dose")}</Text>
                <Text style={style.body}>{data.dose ?? "-"}</Text>
                <Text style={style.head}>{t("medicineCard.quantity")}</Text>
                <Text style={style.body}>{data.quantity ?? "-"}</Text>
                <Text style={style.head}>{t("medicineCard.frequency")}</Text>
                <Text style={style.body}>{data.frequencyPerDay ?? "-"}</Text>
                <Text style={style.head}>{t("medicineCard.instruction")}</Text>
                <Text style={style.body}>{data.instruction ?? "-"}</Text>
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
