import { Text, FlatList, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { router, useRouter, type Href } from "expo-router";
import { darkGrey } from "@/constants/Colors";
import { useState, useEffect } from "react";

interface notification {
    id: string | number;
    message: string;
    href?: string;
}

let DATA = [
    {
        id: 1,
        message: "hello world",
        href: "/(appointment)/"
    },
    {
        id: 2,
        message: "hello world",
    },
    {
        id: 3,
        message: "hello world",
    },
    {
        id: 4,
        message: "hello world",
    },
];

for (let i = 5; i < 15; i++) {
    DATA.push({ id: i, message: "interate" });
}

import * as Notifications from "expo-notifications";

const Item = ({ notification }: { notification: notification }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                { backgroundColor: pressed ? darkGrey : undefined },
                style.item,
            ]}
            onPress={notification.href ? () => router.navigate(notification.href as Href) : null}
        >
            <Text>{notification.message}</Text>
        </Pressable>
    );
};

export default function Notification() {
    const router = useRouter();
    const [data, setData]: [data: notification[], setData: Function] = useState([]);

    async function getLocalNotifications() {
        const res = await Notifications.getAllScheduledNotificationsAsync();
        if (res.length === 0) return;
        const i: notification[] = res.map((v) => {
            return { id: v.identifier, message: v.content.title as string };
        });
        setData(i);
    }

    useEffect(() => {
        getLocalNotifications();
    }, []);

    return (
        <View style={style.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item notification={item} />}
            ></FlatList>
        </View>
    );
}
const screenHeight = Dimensions.get("screen").height;
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 0.1 * screenHeight,
        justifyContent: "center",
        borderBottomColor: darkGrey,
        borderBottomWidth: 1,
        paddingLeft: "5%",
    },
});
