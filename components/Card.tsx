import { ImageBackground, Text, StyleSheet, Pressable, PressableProps } from "react-native";

export type CardParam = { id?: number; title: string; bodyText?: string; imageURL?: string };

export default function Card({ title, bodyText, imageURL, ...rest }: CardParam & PressableProps) {
    return (
        <Pressable {...rest} style={style.container}>
            <ImageBackground
                source={{ uri: imageURL }}
                resizeMode="cover"
                style={{ padding: 25, flex: 1, paddingRight: 80 }}
            >
                <Text style={style.title}>{title}</Text>
                {bodyText && <Text>{bodyText}</Text>}
            </ImageBackground>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        height: 120,
        marginTop: 20,
        backgroundColor: "white",
        overflow: "hidden",
        display: "flex",
        filter: "drop-shadow(0px 4px 3px rgba(0,0,0,0.1))",
    },
    title: {
        fontWeight: "bold",
        marginBottom: 10,
    },
    body: {},
});
