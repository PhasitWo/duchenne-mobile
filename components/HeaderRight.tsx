import { View, StyleSheet, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import type { ViewProps, ViewStyle } from "react-native";

export default function HeaderRight({ style, ...rest }: ViewProps & { style?: ViewStyle }) {
    const navigation = useNavigation();
    return (
        <View style={[stylesheet.container, style]} {...rest}>
            <Pressable onPress={() => navigation.navigate("notification" as never)}>
                <FontAwesome style={stylesheet.bell} name="bell" size={30} color="black" />
                {/* <Text style={stylesheet.notification}>2</Text> */}
            </Pressable>
            {/* <Pressable>
                <Ionicons
                    style={style.profile}
                    name="person-circle"
                    onPress={() => test()}
                    size={40}
                    color="black"
                />
            </Pressable> */}
        </View>
    );
}

const stylesheet = StyleSheet.create({
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
