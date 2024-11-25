import { Text, Pressable, PressableProps, StyleSheet, ViewStyle, ColorValue, ActivityIndicator } from "react-native";
import { darkTint, tint } from "@/constants/Colors";

export default function CustomButton({
    title,
    style,
    normalColor,
    pressedColor,
    showLoading = false,
    ...rest
}: {
    title: string;
    style?: ViewStyle;
    normalColor: ColorValue;
    pressedColor: ColorValue;
    showLoading?: boolean;
} & PressableProps) {
    return (
        <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? pressedColor : normalColor }, defaultStyle.button, style]}
            disabled={showLoading}
            {...rest}
        >
            {showLoading ? <ActivityIndicator size={40} color="white" /> : <Text>{title}</Text>}
        </Pressable>
    );
}

const defaultStyle = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 370,
        height: "6%",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
