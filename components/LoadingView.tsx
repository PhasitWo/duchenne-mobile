import { tint } from "@/constants/Colors";
import { ActivityIndicator, View } from "react-native";

export default function LoadingView() {
    return (
        <View style={{ height: "80%", justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size={80} color={tint} />
        </View>
    );
}
