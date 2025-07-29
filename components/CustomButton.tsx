import { Text, Pressable, PressableProps, StyleSheet, ViewStyle, ColorValue, ActivityIndicator } from "react-native";

export default function CustomButton({
    title,
    style,
    normalColor,
    pressedColor,
    showLoading = false,
    bold = false,
    ...rest
}: {
    title: string;
    style?: ViewStyle;
    normalColor: ColorValue;
    pressedColor: ColorValue;
    showLoading?: boolean;
    bold?: boolean;
} & PressableProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? pressedColor : normalColor },
                defaultStyle.button,
                style,
            ]}
            disabled={showLoading}
            {...rest}
        >
            {showLoading ? (
                <ActivityIndicator size={40} color="white" />
            ) : (
                <Text style={{ fontWeight: bold ? "bold" : "normal" }}>{title}</Text>
            )}
        </Pressable>
    );
}

const defaultStyle = StyleSheet.create({
    button: {
        marginTop: 20,
        width: 370,
        height: 40,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
