import {
    ActivityIndicator,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";

interface PlayerControlsProps {
  isPlaying: boolean;
  isLoading?: boolean;
  onPlayPause: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onStop?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function PlayerControls({
  isPlaying,
  isLoading = false,
  onPlayPause,
  onPrevious,
  onNext,
  onStop,
  style,
}: PlayerControlsProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Botón anterior */}
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.pressed,
        ]}
        onPress={onPrevious}
        disabled={!onPrevious || isLoading}
      >
        <Text style={styles.secondaryIcon}>⏮</Text>
      </Pressable>

      {/* Botón principal */}
      <Pressable
        style={({ pressed }) => [
          styles.playButton,
          pressed && styles.playPressed,
        ]}
        onPress={onPlayPause}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#FFFFFF"
          />
        ) : (
          <Text style={styles.playIcon}>
            {isPlaying ? "⏸" : "▶"}
          </Text>
        )}
      </Pressable>

      {/* Botón siguiente */}
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.pressed,
        ]}
        onPress={onNext}
        disabled={!onNext || isLoading}
      >
        <Text style={styles.secondaryIcon}>⏭</Text>
      </Pressable>

      {/* Botón detener */}
      {onStop && (
        <Pressable
          style={({ pressed }) => [
            styles.stopButton,
            pressed && styles.pressed,
          ]}
          onPress={onStop}
          disabled={isLoading}
        >
          <Text style={styles.stopIcon}>■</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 16,
  },

  secondaryButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  secondaryIcon: {
    fontSize: 20,
    color: Colors.light.text,
  },

  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  playPressed: {
    transform: [{ scale: 0.94 }],
  },

  playIcon: {
    fontSize: 28,
    color: "#FFFFFF",
    marginLeft: 2,
  },

  stopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  stopIcon: {
    fontSize: 16,
    color: Colors.light.error,
  },

  pressed: {
    opacity: 0.6,
  },
});