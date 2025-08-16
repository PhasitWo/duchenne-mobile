import { mdFontSize } from "@/constants/Style";
import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

export default forwardRef<TextInput, TextInputProps>(({ children, style, ...rest }, ref) => {
    return (
        <TextInput style={[{ fontSize: mdFontSize }, style]} ref={ref} allowFontScaling={false} {...rest}>
            {children}
        </TextInput>
    );
});
