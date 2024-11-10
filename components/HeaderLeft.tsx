import { useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable } from "react-native";
import { darkGrey } from "@/constants/Colors";

export default function HeaderLeft() {
    const router = useRouter();
    return (
        <Pressable
            onPress={router.back}
            style={({ pressed }) => [
                { backgroundColor: pressed ? darkGrey : "white", borderRadius: 100, marginLeft: 15 },
            ]}
        >
            <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
    );
}
