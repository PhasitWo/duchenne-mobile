import CustomText from "@/components/CustomText";
import { View } from "react-native";

export default function Contact() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <CustomText>dmdwecare2025@gmail.com</CustomText>
        </View>
    );
}
