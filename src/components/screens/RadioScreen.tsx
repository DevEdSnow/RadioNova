import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useRadioStore } from "@/store/radioStore";
import { NowPlaying } from "@/types/radio";
import { Station } from "@/types/station";

import NowPlayingComponent from "@/components/radio/NowPlaying";
import PlayerControls from "@/components/radio/PlayerControls";
import VolumeControls from "@/components/radio/VolumeControl";

interface RadioScreenProps {
  station?: Station | null;
  nowPlaying?: NowPlaying | null;
  onBack?: () => void;
  onFavoritePress?: (station: Station) => void;
  onSharePress?: (station: Station) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function RadioScreen({
  station: stationProp,
  nowPlaying: nowPlayingProp,
  onBack,
  onFavoritePress,
  onSharePress,
  onPrevious,
  onNext,
}: RadioScreenProps) {
  const {
    currentStation,
    nowPlaying: storeNowPlaying,
    isPlaying,
    isLoading,
    error,
    setPlaying,
    clearError,
  } = useRadioStore();

  const station = stationProp ?? currentStation;
  const nowPlaying = nowPlayingProp ?? storeNowPlaying;

  const handlePlayPause = () => {
    if (!station) {
      return;
    }

    setPlaying(!isPlaying);
  };

  if (!station) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📻</Text>

          <Text style={styles.emptyTitle}>
            Ninguna estación seleccionada
          </Text>

          <Text style={styles.emptyText}>
            Selecciona una estación para comenzar a escuchar RadioNova.
          </Text>

          {onBack && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Text style={styles.backButtonText}>
                Explorar estaciones
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          {onBack ? (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Text style={styles.headerButtonText}>‹</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerSpacer} />
          )}

          <Text style={styles.headerTitle}>RadioNova</Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => onSharePress?.(station)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>↗</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => onFavoritePress?.(station)}
              activeOpacity={0.8}
            >
              <Text style={styles.actionIcon}>
                {station.isFavorite ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Station artwork */}
        <View style={styles.artworkContainer}>
          {station.coverUrl || station.logoUrl ? (
            <Image
              source={{
                uri: station.coverUrl ?? station.logoUrl,
              }}
              style={styles.cover}
            />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Text style={styles.coverIcon}>📻</Text>
            </View>
          )}

          {station.isLive && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
          )}
        </View>

        {/* Station information */}
        <View style={styles.stationInfo}>
          <Text style={styles.stationName}>{station.name}</Text>

          {station.frequency && (
            <Text style={styles.frequency}>{station.frequency}</Text>
          )}

          {station.slogan && (
            <Text style={styles.slogan}>{station.slogan}</Text>
          )}

          {station.location?.city && (
            <Text style={styles.location}>
              📍 {station.location.city}
              {station.location.state
                ? `, ${station.location.state}`
                : ""}
            </Text>
          )}
        </View>

        {/* Now playing */}
        <View style={styles.section}>
          <NowPlayingComponent
            station={station}
            nowPlaying={nowPlaying}
            isPlaying={isPlaying}
          />
        </View>

        {/* Error */}
        {error && (
          <View style={styles.errorContainer}>
            <View style={styles.errorContent}>
              <Text style={styles.errorIcon}>⚠️</Text>

              <View style={styles.errorTextContainer}>
                <Text style={styles.errorTitle}>
                  Error de reproducción
                </Text>

                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={clearError}
              style={styles.closeError}
            >
              <Text style={styles.closeErrorText}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Player controls */}
        <View style={styles.controlsContainer}>
          <PlayerControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            onPlayPause={handlePlayPause}
            onPrevious={onPrevious}
            onNext={onNext}
          />
        </View>

        {/* Volume */}
        <View style={styles.volumeContainer}>
          <Text style={styles.sectionTitle}>Volumen</Text>

          <VolumeControls />
        </View>

        {/* Station details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>
            Información de la estación
          </Text>

          {station.description && (
            <Text style={styles.description}>
              {station.description}
            </Text>
          )}

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Categoría</Text>
              <Text style={styles.detailValue}>
                {station.category}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Idioma</Text>
              <Text style={styles.detailValue}>
                {station.language}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>País</Text>
              <Text style={styles.detailValue}>
                {station.country}
              </Text>
            </View>

            {station.listeners !== undefined && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Oyentes</Text>
                <Text style={styles.detailValue}>
                  {station.listeners.toLocaleString()}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Website */}
        {station.websiteUrl && (
          <TouchableOpacity
            style={styles.websiteButton}
            activeOpacity={0.8}
          >
            <Text style={styles.websiteIcon}>🌐</Text>

            <View style={styles.websiteInfo}>
              <Text style={styles.websiteTitle}>
                Sitio web oficial
              </Text>

              <Text style={styles.websiteUrl} numberOfLines={1}>
                {station.websiteUrl}
              </Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  content: {
    paddingBottom: 120,
  },

  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: Colors.light.text,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  headerButtonText: {
    fontSize: 34,
    lineHeight: 34,
    color: Colors.light.text,
  },

  actionIcon: {
    fontSize: 20,
    color: Colors.light.text,
  },

  headerSpacer: {
    width: 40,
  },

  artworkContainer: {
    marginTop: 10,
    marginHorizontal: 28,
    aspectRatio: 1,
    position: "relative",
  },

  cover: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
  },

  coverPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  coverIcon: {
    fontSize: 80,
  },

  liveBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.live,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: "#FFFFFF",
  },

  liveText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  stationInfo: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },

  stationName: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.light.text,
  },

  frequency: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "700",
    color: Colors.light.primary,
  },

  slogan: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: Colors.light.textSecondary,
  },

  location: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  controlsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  volumeContainer: {
    marginTop: 26,
    paddingHorizontal: 24,
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 17,
    fontWeight: "700",
    color: Colors.light.text,
  },

  errorContainer: {
    marginHorizontal: 20,
    marginTop: 18,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.error,
  },

  errorContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  errorIcon: {
    fontSize: 22,
    marginRight: 10,
  },

  errorTextContainer: {
    flex: 1,
  },

  errorTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.error,
  },

  errorMessage: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  closeError: {
    padding: 5,
  },

  closeErrorText: {
    fontSize: 24,
    color: Colors.light.textSecondary,
  },

  detailsCard: {
    marginHorizontal: 20,
    marginTop: 28,
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  detailsTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.light.text,
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.light.textSecondary,
  },

  detailsGrid: {
    marginTop: 18,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  detailItem: {
    width: "50%",
    marginBottom: 15,
  },

  detailLabel: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  detailValue: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.text,
  },

  websiteButton: {
    marginHorizontal: 20,
    marginTop: 14,
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  websiteIcon: {
    fontSize: 24,
  },

  websiteInfo: {
    flex: 1,
    marginLeft: 12,
  },

  websiteTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },

  websiteUrl: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  arrow: {
    fontSize: 28,
    color: Colors.light.textSecondary,
  },

  emptyContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyIcon: {
    fontSize: 70,
    marginBottom: 20,
  },

  emptyTitle: {
    fontSize: 21,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.light.text,
  },

  emptyText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: Colors.light.textSecondary,
  },

  backButton: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
  },

  backButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});