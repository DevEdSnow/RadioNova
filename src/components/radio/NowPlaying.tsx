import {
    Image,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { NowPlaying as NowPlayingType } from "@/types/radio";
import { Station } from "@/types/station";

interface NowPlayingProps {
  station: Station | null;
  nowPlaying: NowPlayingType | null;
  isPlaying?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function NowPlaying({
  station,
  nowPlaying,
  isPlaying = false,
  style,
}: NowPlayingProps) {
  const title =
    nowPlaying?.title ||
    "Sin información";

  const artist =
    nowPlaying?.artist ||
    "Artista desconocido";

  const imageUrl =
    nowPlaying?.albumArt ||
    station?.coverUrl ||
    station?.logoUrl;

  return (
    <View style={[styles.container, style]}>
      {/* Imagen */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>♫</Text>
          </View>
        )}
      </View>

      {/* Información */}
      <View style={styles.info}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              isPlaying
                ? styles.statusActive
                : styles.statusInactive,
            ]}
          />

          <Text style={styles.statusText}>
            {isPlaying ? "REPRODUCIENDO" : "PAUSADO"}
          </Text>
        </View>

        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>

        <Text
          style={styles.artist}
          numberOfLines={1}
        >
          {artist}
        </Text>

        {station && (
          <Text
            style={styles.station}
            numberOfLines={1}
          >
            {station.name}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.playerBackground,
  },

  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
  },

  placeholderIcon: {
    fontSize: 40,
    color: "#FFFFFF",
  },

  info: {
    flex: 1,
    justifyContent: "center",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusActive: {
    backgroundColor: Colors.light.live,
  },

  statusInactive: {
    backgroundColor: Colors.light.textSecondary,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: Colors.light.textSecondary,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },

  artist: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 4,
  },

  station: {
    fontSize: 12,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});