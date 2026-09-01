import {
    ActivityIndicator,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { AppText } from "./AppText";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

type LoadingSize =
  | "small"
  | "medium"
  | "large";

interface LoadingProps {
  message?: string;

  size?: LoadingSize;

  fullScreen?: boolean;

  style?: StyleProp<ViewStyle>;
}

export const Loading = ({
  message,

  size = "medium",

  fullScreen = false,

  style,
}: LoadingProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  const getIndicatorSize = () => {
    switch (size) {
      case "small":
        return "small" as const;

      case "large":
        return "large" as const;

      case "medium":
      default:
        return "large" as const;
    }
  };

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
      <ActivityIndicator
        size={getIndicatorSize()}
        color={colors.primary}
      />

      {message && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",

    padding: 24,
  },

  fullScreen: {
    flex: 1,
    minHeight: "100%",
  },

  message: {
    marginTop: 12,
  },
});