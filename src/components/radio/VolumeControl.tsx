import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useRadioStore } from "@/store/radioStore";

interface VolumeControlsProps {
  style?: StyleProp<ViewStyle>;
}

export default function VolumeControls({
  style,
}: VolumeControlsProps) {
  const volume = useRadioStore(
    (state) => state.volume
  );

  const setVolume = useRadioStore(
    (state) => state.setVolume
  );

  const increaseVolume = () => {
    setVolume(volume + 0.1);
  };

  const decreaseVolume = () => {
    setVolume(volume - 0.1);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  const volumePercentage = Math.round(volume * 100);

  return (
    <View style={[styles.container, style]}>
      {/* Icono / botón de silencio */}
      <Pressable
        onPress={toggleMute}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.volumeIcon}>
          {volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
        </Text>
      </Pressable>

      {/* Botón bajar volumen */}
      <Pressable
        onPress={decreaseVolume}
        disabled={volume <= 0}
        style={({ pressed }) => [
          styles.smallButton,
          volume <= 0 && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>−</Text>
      </Pressable>

      {/* Barra de volumen */}
      <View style={styles.sliderContainer}>
        <View style={styles.sliderBackground}>
          <View
            style={[
              styles.sliderProgress,
              {
                width: `${volumePercentage}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.percentage}>
          {volumePercentage}%
        </Text>
      </View>

      {/* Botón subir volumen */}
      <Pressable
        onPress={increaseVolume}
        disabled={volume >= 1}
        style={({ pressed }) => [
          styles.smallButton,
          volume >= 1 && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  volumeIcon: {
    fontSize: 21,
  },

  smallButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
    lineHeight: 22,
  },

  sliderContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  sliderBackground: {
    flex: 1,
    height: 6,
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: Colors.light.border,
  },

  sliderProgress: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: Colors.light.primary,
  },

  percentage: {
    width: 38,
    fontSize: 11,
    fontWeight: "700",
    color: Colors.light.textSecondary,
    textAlign: "right",
  },

  disabled: {
    opacity: 0.35,
  },

  pressed: {
    opacity: 0.6,
  },
});