import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { darkGrey } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function HeaderRight() {
    const router = useRouter()
    const test = () => Alert.alert("test alert", "haha xdxd")
    return (
        <View style={style.container}>
            <Pressable
                onPress={() => router.push("/notification")}
            >
                <FontAwesome style={style.bell} name="bell" size={30} color="black" />
                <Text style={style.notification}>2</Text>
            </Pressable>
            <Pressable
            >
                <Ionicons
                    style={style.profile}
                    name="person-circle"
                    onPress={() => test()}
                    size={40}
                    color="black"
                />
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    bell: {
        paddingRight: 15,
    },
    profile: {},
    notification: {
        backgroundColor: "#f85c5c",
        borderRadius: 200,
        position: "absolute",
        width: 20,
        textAlign: "center",
        bottom: -5,
        right: 10,
    },
});