import {
    useEffect,
    useRef,
} from "react";

import {
    Animated,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { AppText } from "@/components/common/AppText";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

interface LiveIndicatorProps {
  isLive?: boolean;

  label?: string;

  showLabel?: boolean;

  size?: "small" | "medium" | "large";

  style?: StyleProp<ViewStyle>;
}

export const LiveIndicator = ({
  isLive = true,

  label = "EN VIVO",

  showLabel = true,

  size = "medium",

  style,
}: LiveIndicatorProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  const pulseAnimation =
    useRef(
      new Animated.Value(1)
    ).current;

  useEffect(() => {
    if (!isLive) {
      pulseAnimation.setValue(1);
      return;
    }

    const animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            pulseAnimation,
            {
              toValue: 1.5,
              duration: 700,
              useNativeDriver: true,
            }
          ),

          Animated.timing(
            pulseAnimation,
            {
              toValue: 1,
              duration: 700,
              useNativeDriver: true,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [
    isLive,
    pulseAnimation,
  ]);

  const getDotSize = () => {
    switch (size) {
      case "small":
        return 6;

      case "large":
        return 10;

      case "medium":
      default:
        return 8;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return 11;

      case "large":
        return 15;

      case "medium":
      default:
        return 13;
    }
  };

  const dotSize = getDotSize();

  return (
    <View
      style={[
        styles.container,
        style,
      ]}
    >
      <View
        style={[
          styles.dotContainer,
          {
            width: dotSize + 8,
            height: dotSize + 8,
          },
        ]}
      >
        {isLive && (
          <Animated.View
            style={[
              styles.pulse,
              {
                width: dotSize,
                height: dotSize,
                borderRadius:
                  dotSize / 2,
                backgroundColor:
                  colors.live,
                transform: [
                  {
                    scale:
                      pulseAnimation,
                  },
                ],
                opacity: 0.3,
              },
            ]}
          />
        )}

        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius:
                dotSize / 2,
              backgroundColor: isLive
                ? colors.live
                : colors.textTertiary,
            },
          ]}
        />
      </View>

      {showLabel && (
        <AppText
          style={[
            styles.label,
            {
              color: isLive
                ? colors.live
                : colors.textTertiary,

              fontSize:
                getTextSize(),
            },
          ]}
        >
          {isLive
            ? label
            : "FUERA DE LÍNEA"}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    gap: 6,
  },

  dotContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  pulse: {
    position: "absolute",
  },

  dot: {
    position: "absolute",
  },

  label: {
    fontWeight: "700",

    letterSpacing: 0.5,
  },
});