import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

type ButtonSize =
  | "small"
  | "medium"
  | "large";

interface AppButtonProps {
  title: string;
  onPress: () => void | Promise<void>;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  disabled?: boolean;

  fullWidth?: boolean;

  icon?: React.ReactNode;
  iconPosition?: "left" | "right";

  style?: ViewStyle;
  textStyle?: TextStyle;

  accessibilityLabel?: string;
}

export const AppButton = ({
  title,
  onPress,

  variant = "primary",
  size = "medium",

  loading = false,
  disabled = false,

  fullWidth = false,

  icon,
  iconPosition = "left",

  style,
  textStyle,

  accessibilityLabel,
}: AppButtonProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  const isDisabled =
    disabled || loading;

  const handlePress = async () => {
    if (isDisabled) {
      return;
    }

    try {
      await onPress();
    } catch (error) {
      console.error(
        "Error al ejecutar AppButton:",
        error
      );
    }
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case "secondary":
        return colors.secondary;

      case "danger":
        return colors.error;

      case "outline":
      case "ghost":
        return "transparent";

      case "primary":
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return colors.primary;

      case "ghost":
        return colors.text;

      case "secondary":
      case "danger":
      case "primary":
      default:
        return colors.textInverse;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case "outline":
        return colors.primary;

      default:
        return "transparent";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return styles.small;

      case "large":
        return styles.large;

      case "medium":
      default:
        return styles.medium;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? title
      }
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      style={({ pressed }) => [
        styles.base,
        getSizeStyles(),

        {
          backgroundColor:
            getBackgroundColor(),

          borderColor:
            getBorderColor(),

          opacity: isDisabled
            ? 0.5
            : pressed
              ? 0.8
              : 1,
        },

        fullWidth &&
          styles.fullWidth,

        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
        />
      ) : (
        <>
          {icon &&
            iconPosition === "left" &&
            icon}

          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
              },
              textStyle,
            ]}
          >
            {title}
          </Text>

          {icon &&
            iconPosition === "right" &&
            icon}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderRadius: 12,

    gap: 8,
  },

  small: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  medium: {
    minHeight: 46,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  large: {
    minHeight: 54,
    paddingHorizontal: 24,
    paddingVertical: 15,
  },

  fullWidth: {
    width: "100%",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});