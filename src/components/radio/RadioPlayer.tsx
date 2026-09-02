import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useRadioStore } from "@/store/radioStore";

import NowPlaying from "./NowPlaying";
import PlayerControls from "./PlayerControls";

interface RadioPlayerProps {
  style?: StyleProp<ViewStyle>;
  onPrevious?: () => void;
  onNext?: () => void;
  onStop?: () => void;
}

export default function RadioPlayer({
  style,
  onPrevious,
  onNext,
  onStop,
}: RadioPlayerProps) {
  const currentStation = useRadioStore(
    (state) => state.currentStation
  );

  const nowPlaying = useRadioStore(
    (state) => state.nowPlaying
  );

  const isPlaying = useRadioStore(
    (state) => state.isPlaying
  );

  const isLoading = useRadioStore(
    (state) => state.isLoading
  );

  const error = useRadioStore(
    (state) => state.error
  );

  const setPlaying = useRadioStore(
    (state) => state.setPlaying
  );

  const clearError = useRadioStore(
    (state) => state.clearError
  );

  const handlePlayPause = () => {
    if (!currentStation) {
      return;
    }

    setPlaying(!isPlaying);
  };

  if (!currentStation) {
    return (
      <View style={[styles.emptyContainer, style]}>
        <Text style={styles.emptyIcon}>📻</Text>

        <Text style={styles.emptyTitle}>
          Ninguna estación seleccionada
        </Text>

        <Text style={styles.emptyDescription}>
          Selecciona una estación para comenzar a escuchar.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            RadioNova
          </Text>

          <Text style={styles.headerSubtitle}>
            Reproductor de radio
          </Text>
        </View>

        <View
          style={[
            styles.liveBadge,
            !isPlaying && styles.liveBadgeInactive,
          ]}
        >
          <View
            style={[
              styles.liveDot,
              !isPlaying && styles.liveDotInactive,
            ]}
          />

          <Text
            style={[
              styles.liveText,
              !isPlaying && styles.liveTextInactive,
            ]}
          >
            {isPlaying ? "EN VIVO" : "PAUSADO"}
          </Text>
        </View>
      </View>

      {/* Canción actual */}
      <NowPlaying
        station={currentStation}
        nowPlaying={nowPlaying}
        isPlaying={isPlaying}
        style={styles.nowPlaying}
      />

      {/* Error */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            No se pudo reproducir la estación
          </Text>

          <Text style={styles.errorText}>
            {error}
          </Text>

          <Text
            style={styles.retryText}
            onPress={clearError}
          >
            Cerrar mensaje
          </Text>
        </View>
      )}

      {/* Controles */}
      <PlayerControls
        isPlaying={isPlaying}
        isLoading={isLoading}
        onPlayPause={handlePlayPause}
        onPrevious={onPrevious}
        onNext={onNext}
        onStop={onStop}
      />

      {/* Información de la estación */}
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>
          {currentStation.name}
        </Text>

        {currentStation.frequency && (
          <Text style={styles.frequency}>
            {currentStation.frequency}
          </Text>
        )}

        {currentStation.slogan && (
          <Text style={styles.slogan}>
            {currentStation.slogan}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.light.playerBackground,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
  },

  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: Colors.light.live,
  },

  liveBadgeInactive: {
    backgroundColor: Colors.light.border,
  },

  liveDot: {
    width: 7,
    height: 7,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },

  liveDotInactive: {
    backgroundColor: Colors.light.textSecondary,
  },

  liveText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  liveTextInactive: {
    color: Colors.light.textSecondary,
  },

  nowPlaying: {
    marginBottom: 8,
  },

  errorContainer: {
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#FDECEC",
    borderWidth: 1,
    borderColor: Colors.light.error,
  },

  errorTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.error,
    marginBottom: 4,
  },

  errorText: {
    fontSize: 12,
    color: Colors.light.text,
    lineHeight: 18,
  },

  retryText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.primary,
  },

  stationInfo: {
    alignItems: "center",
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },

  stationName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },

  frequency: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  slogan: {
    marginTop: 4,
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.light.textSecondary,
    textAlign: "center",
  },

  emptyContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    borderRadius: 20,
    backgroundColor: Colors.light.playerBackground,
  },

  emptyIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});