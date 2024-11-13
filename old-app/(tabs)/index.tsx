import { Text, View, ScrollView, Pressable, Alert } from "react-native";
import Card from "@/components/Card";

const mockup = [
    { title: "Learn1", bodyText: "hello 1234" },
    { title: "Learn2", bodyText: "hello 1234" },
    { title: "Learn3", bodyText: "hello 1234" },
    { title: "Learn4", bodyText: "hello 1234" },
    { title: "Learn5", bodyText: "hello 1234" },
    { title: "Learn6", bodyText: "hello 1234" },
    { title: "Learn7", bodyText: "hello 1234" },
    { title: "Learn8", bodyText: "hello 1234" },
    { title: "Learn9", bodyText: "hello 1234" },
];

export default function Index() {
    return (
        <View style={{ height: "100%" }}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                {mockup.map((v, k) => (
                    <Card
                        key={k}
                        title={v.title}
                        bodyText={v.bodyText}
                        onPress={() => Alert.alert("HI", "1234")}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
