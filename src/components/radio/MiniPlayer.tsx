
import {
    Image,
    Pressable,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";

import { AppText } from "@/components/common/AppText";
import { LiveIndicator } from "./LiveIndicator";

import { getThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";

import { useRadioStore } from "@/store/radioStore";

interface MiniPlayerProps {
  onPress?: () => void;
  onPlayPause?: () => void;
  style?: StyleProp<ViewStyle>;
}

export const MiniPlayer = ({
  onPress,
  onPlayPause,
  style,
}: MiniPlayerProps) => {
  const {
    theme,
    isDark,
  } = useTheme();

  const colors = getThemeColors(
    theme,
    isDark
  );

  const currentStation = useRadioStore(
    (state) => state.currentStation
  );

  const isPlaying = useRadioStore(
    (state) => state.isPlaying
  );

  const isLoading = useRadioStore(
    (state) => state.isLoading
  );

  const setPlaying = useRadioStore(
    (state) => state.setPlaying
  );

  /**
   * Si no existe una estación seleccionada,
   * no mostramos el MiniPlayer.
   */
  if (!currentStation) {
    return null;
  }

  const handlePlayPause = () => {
    if (isLoading) {
      return;
    }

    if (onPlayPause) {
      onPlayPause();
      return;
    }

    setPlaying(!isPlaying);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.playerBackground,

          borderColor:
            colors.border,
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={styles.stationButton}
      >
        <Image
          source={{
            uri:
              currentStation.logoUrl ??
              "https://placehold.co/100x100/png?text=Radio",
          }}
          style={styles.logo}
        />

        <View style={styles.info}>
          <AppText
            variant="label"
            numberOfLines={1}
            style={styles.stationName}
          >
            {currentStation.name}
          </AppText>

          <LiveIndicator
            isLive={currentStation.isLive}
            size="small"
          />
        </View>
      </Pressable>

      <Pressable
        onPress={handlePlayPause}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityLabel={
          isPlaying
            ? "Pausar radio"
            : "Reproducir radio"
        }
        style={({ pressed }) => [
          styles.playButton,
          {
            backgroundColor:
              colors.primary,

            opacity: isLoading
              ? 0.5
              : pressed
                ? 0.75
                : 1,
          },
        ]}
      >
        <AppText style={styles.playIcon}>
          {isLoading
            ? "⏳"
            : isPlaying
              ? "⏸"
              : "▶"}
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    minHeight: 68,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderTopWidth: 1,

    gap: 10,

    elevation: 8,

    shadowOffset: {
      width: 0,
      height: -2,
    },

    shadowOpacity: 0.1,

    shadowRadius: 5,
  },

  stationButton: {
    flex: 1,

    minWidth: 0,

    flexDirection: "row",

    alignItems: "center",

    gap: 10,
  },

  logo: {
    width: 48,
    height: 48,

    borderRadius: 8,
  },

  info: {
    flex: 1,

    minWidth: 0,

    gap: 4,
  },

  stationName: {
    fontSize: 14,
    fontWeight: "600",
  },

  playButton: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",
  },

  playIcon: {
    fontSize: 18,

    color: "#FFFFFF",

    fontWeight: "700",
  },
});