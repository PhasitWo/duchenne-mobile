import { ImageBackground, StyleSheet, Pressable, PressableProps } from "react-native";
import CustomText from "./CustomText";
import { isTablet } from "@/constants/Style";

export type CardParam = { id?: number; title: string; bodyText?: string; imageURL?: string };

export default function Card({ title, bodyText, imageURL, ...rest }: CardParam & PressableProps) {
    return (
        <Pressable {...rest} style={style.container}>
            <ImageBackground
                source={{ uri: imageURL }}
                resizeMode="cover"
                style={{ padding: 25, flex: 1, paddingRight: 80 }}
            >
                <CustomText style={style.title}>{title}</CustomText>
                {bodyText && <CustomText>{bodyText}</CustomText>}
            </ImageBackground>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350 * (isTablet ? 1.15 : 1),
        height: 120 * (isTablet ? 1.15 : 1),
        marginTop: 20,
        backgroundColor: "white",
        overflow: "hidden",
        display: "flex",
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {},
});
