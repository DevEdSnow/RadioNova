import React from "react";
import {
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { AppButton } from "./AppButton";
import { AppText } from "./AppText";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface EmptyStateProps {
  title?: string;
  message?: string;

  icon?: React.ReactNode;

  buttonText?: string;
  onButtonPress?: () => void | Promise<void>;

  style?: ViewStyle;

  fullScreen?: boolean;
}

export const EmptyState = ({
  title = "No hay contenido",
  message = "No encontramos información para mostrar.",
  icon,

  buttonText,
  onButtonPress,

  style,

  fullScreen = false,
}: EmptyStateProps) => {
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

        fullScreen &&
          styles.fullScreen,

        {
          backgroundColor:
            colors.background,
        },

        style,
      ]}
    >
      {icon ? (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor:
                colors.backgroundSecondary,
            },
          ]}
        >
          {icon}
        </View>
      ) : (
        <View
          style={[
            styles.defaultIcon,
            {
              backgroundColor:
                colors.backgroundSecondary,
            },
          ]}
        >
          <AppText
            style={styles.defaultIconText}
          >
            📻
          </AppText>
        </View>
      )}

      <AppText
        variant="subtitle"
        align="center"
        style={styles.title}
      >
        {title}
      </AppText>

      <AppText
        variant="body"
        align="center"
        style={[
          styles.message,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {message}
      </AppText>

      {buttonText &&
        onButtonPress && (
          <AppButton
            title={buttonText}
            onPress={onButtonPress}
            style={styles.button}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  fullScreen: {
    flex: 1,
    minHeight: "100%",
  },

  iconContainer: {
    width: 80,
    height: 80,

    borderRadius: 40,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },

  defaultIcon: {
    width: 80,
    height: 80,

    borderRadius: 40,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 20,
  },

  defaultIconText: {
    fontSize: 36,
  },

  title: {
    marginBottom: 8,
  },

  message: {
    maxWidth: 320,

    lineHeight: 22,

    marginBottom: 24,
  },

  button: {
    minWidth: 160,
  },
});