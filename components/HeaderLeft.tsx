import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, ViewStyle } from "react-native";
import { darkGrey } from "@/constants/Colors";
import { ParamListBase } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type props = { navigation: NativeStackNavigationProp<ParamListBase>; style: ViewStyle };
export default function HeaderLeft({ navigation, style }: props) {
    // const navigationHook = useNavigation();
    return (
        <Pressable
            onPress={navigation.goBack}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? darkGrey : "white",
                    borderRadius: 100,
                    marginLeft: 20,
                    width: 35,
                    height: 35,
                    justifyContent: "center",
                    alignItems: "center",
                },
                style,
            ]}
        >
            <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
    );
}
