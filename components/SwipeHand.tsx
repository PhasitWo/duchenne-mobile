import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";
import Animated, { withTiming, useAnimatedStyle, Easing, withSequence, withRepeat } from "react-native-reanimated";
const config = {
    duration: 1100,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
};

export default function SwipeHand({ from, to }: { from: number; to: number }) {
    const { t } = useTranslation();
    const style = useAnimatedStyle(() => {
        return {
            top: withRepeat(withSequence(withTiming(from, config), withTiming(to, config)), -1, true),
            opacity: withSequence(withTiming(100), withTiming(0, { duration: 5000 })),
        };
    });

    //  setTimeout(() => {
    //     setVisible(false);
    //  }, 3000);

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    zIndex: 50,
                    justifyContent: "center",
                    alignItems: "center",
                },
                style,
            ]}
        >
            <MaterialCommunityIcons name="gesture-swipe-down" size={60} color="black" />
            <Text style={{ marginTop: 10, backgroundColor: "white", borderRadius: 40, padding: 10 }}>
                {t("swipeHand.pull")}
            </Text>
        </Animated.View>
    );
}
