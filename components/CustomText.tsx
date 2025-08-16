import { mdFontSize } from "@/constants/Style";
import { TextProps, Text } from "react-native";
import { forwardRef } from "react";

export default forwardRef<Text, TextProps>(({ children, style, ...rest }, ref) => {
    return (
        <Text ref={ref} style={[{ fontSize: mdFontSize }, style]} allowFontScaling={false} {...rest}>
            {children}
        </Text>
    );
});
