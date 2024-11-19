import { View, Text, StyleSheet } from "react-native";
import HeaderRight from "@/components/HeaderRight";
import HeaderLeft from "../HeaderLeft";

const headerHeight = 90;
type props = { title?: string, navigation: any, options: any, showBackButton? : boolean, showNotification? : boolean ,route:any };

export default function Header({ navigation, options, route, showBackButton = true, showNotification = true }: props) {
    return (
        <View style={style.container}>
            <Text style={style.title}>{options.title ?? route.name}</Text>
            {showNotification && <HeaderRight style={style.headerRight} />}
            {showBackButton && <HeaderLeft navigation={navigation} style={style.headerLeft} />}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        height: headerHeight,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: headerHeight * 0.15,
    },
    headerRight: {
        position: "absolute",
        right: 0,
        bottom: headerHeight * 0.15,
    },
    headerLeft: {
        position: "absolute",
        left: 0,
        bottom: headerHeight * 0.15,
    },
});
