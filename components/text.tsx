import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { Text as RNText, TextProps } from "react-native";

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  const theme = useThemeColor();

  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: "regular",
          color: theme.text,
        },
        props.style,
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;
