import { useLanguage } from "@/hooks/useLanguage";
import { View, Text } from "react-native";

export default function ForgotPassword() {
    const { lang } = useLanguage();
    return (
        <View style={{ flex: 1, backgroundColor: "white", justifyContent: "flex-start", alignItems: "center" }}>
            <Text>{lang("ติดต่อ", "Contact")}</Text>
            <Text>test@email.com</Text>
            <Text>0111111111</Text>
        </View>
    );
}
