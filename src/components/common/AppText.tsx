import React from "react";

import {
    StyleProp,
    StyleSheet,
    Text,
    TextProps,
    TextStyle,
} from "react-native";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

type TextVariant =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "label"
  | "button"
  | "error"
  | "success"
  | "link";

type TextAlign =
  | "left"
  | "center"
  | "right"
  | "justify";

interface AppTextProps extends TextProps {
  children: React.ReactNode;

  variant?: TextVariant;

  color?: string;

  align?: TextAlign;

  bold?: boolean;

  italic?: boolean;

  uppercase?: boolean;

  style?: StyleProp<TextStyle>;
}

export const AppText = ({
  children,
  variant = "body",

  color,

  align = "left",

  bold = false,

  italic = false,

  uppercase = false,

  style,

  ...props
}: AppTextProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "title":
        return {
          fontSize: 28,
          fontWeight: "700",
          color: colors.text,
        };

      case "subtitle":
        return {
          fontSize: 20,
          fontWeight: "600",
          color: colors.text,
        };

      case "caption":
        return {
          fontSize: 12,
          fontWeight: "400",
          color: colors.textTertiary,
        };

      case "label":
        return {
          fontSize: 14,
          fontWeight: "600",
          color: colors.textSecondary,
        };

      case "button":
        return {
          fontSize: 16,
          fontWeight: "600",
          color: colors.textInverse,
        };

      case "error":
        return {
          fontSize: 14,
          fontWeight: "500",
          color: colors.error,
        };

      case "success":
        return {
          fontSize: 14,
          fontWeight: "500",
          color: colors.success,
        };

      case "link":
        return {
          fontSize: 14,
          fontWeight: "600",
          color: colors.primary,
        };

      case "body":
      default:
        return {
          fontSize: 16,
          fontWeight: "400",
          color: colors.text,
        };
    }
  };

  return (
    <Text
      {...props}
      style={[
        styles.base,
        getVariantStyle(),

        {
          textAlign: align,
        },

        bold && styles.bold,
        italic && styles.italic,
        uppercase && styles.uppercase,

        color
          ? { color }
          : undefined,

        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },

  bold: {
    fontWeight: "700",
  },

  italic: {
    fontStyle: "italic",
  },

  uppercase: {
    textTransform: "uppercase",
  },
});