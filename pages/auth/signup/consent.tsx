import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SignupStackParamList } from "./_stack";
import CustomButton from "@/components/CustomButton";
import { color, darkGrey } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<SignupStackParamList, "index">;
export default function Consent({ navigation }: Props) {
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum
            </Text>
            <Text>
                ท่านสามารถอ่านข้อมูลอย่างละเอียดได้ที่
                <Text style={{ color: "blue" }} onPress={() => navigation.navigate("privacy")}>
                    ประกาศความเป็นส่วนตัว
                </Text>
            </Text>
            <CustomButton
                title={t("consent.accept")}
                normalColor={color.tint}
                pressedColor={darkGrey}
                style={{ height: 60, borderRadius: 10, marginTop: 30 }}
                bold
                onPress={() => navigation.navigate("signup")}
            />
        </View>
    );
}
