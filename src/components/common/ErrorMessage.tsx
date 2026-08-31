import React from "react";
import {
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface ErrorMessageProps {
  message: string;

  title?: string;

  icon?: React.ReactNode;

  buttonText?: string;

  onRetry?: () => void | Promise<void>;

  style?: StyleProp<ViewStyle>;
}

export const ErrorMessage = ({
  message,

  title = "Ha ocurrido un error",

  icon,

  buttonText = "Reintentar",

  onRetry,

  style,
}: ErrorMessageProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.backgroundSecondary,
          borderColor: colors.error,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              colors.error + "18",
          },
        ]}
      >
        {icon ?? (
          <AppText
            style={styles.defaultIcon}
          >
            ⚠️
          </AppText>
        )}
      </View>

      <View style={styles.content}>
        <AppText
          variant="subtitle"
          style={[
            styles.title,
            {
              color: colors.error,
            },
          ]}
        >
          {title}
        </AppText>

        <AppText
          variant="body"
          style={[
            styles.message,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {message}
        </AppText>

        {onRetry && (
          <AppButton
            title={buttonText}
            variant="outline"
            size="small"
            onPress={onRetry}
            style={styles.button}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "row",

    alignItems: "flex-start",

    padding: 16,

    borderWidth: 1,

    borderRadius: 12,

    gap: 12,
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 21,

    alignItems: "center",
    justifyContent: "center",
  },

  defaultIcon: {
    fontSize: 20,
  },

  content: {
    flex: 1,
  },

  title: {
    marginBottom: 4,
  },

  message: {
    lineHeight: 21,
  },

  button: {
    alignSelf: "flex-start",
    marginTop: 12,
  },
});