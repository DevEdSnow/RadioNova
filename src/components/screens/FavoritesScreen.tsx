import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Station } from "@/types/station";

export default function FavoritesScreen() {
  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoritesStore(
    (state) => state.removeFavorite
  );

  const renderStation = ({
    item,
  }: {
    item: Station;
  }) => {
    const imageUrl =
      item.logoUrl || item.coverUrl;

    return (
      <View style={styles.stationCard}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.logo}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoIcon}>📻</Text>
            </View>
          )}
        </View>

        {/* Información */}
        <View style={styles.stationInfo}>
          <Text
            style={styles.stationName}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          {item.frequency && (
            <Text style={styles.frequency}>
              {item.frequency}
            </Text>
          )}

          {item.location?.city && (
            <Text
              style={styles.location}
              numberOfLines={1}
            >
              📍 {item.location.city}
              {item.location.state
                ? `, ${item.location.state}`
                : ""}
            </Text>
          )}

          {item.isLive && (
            <View style={styles.liveContainer}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                EN VIVO
              </Text>
            </View>
          )}
        </View>

        {/* Favorito */}
        <Pressable
          onPress={() => removeFavorite(item.id)}
          style={({ pressed }) => [
            styles.favoriteButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.favoriteIcon}>
            ♥
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Mis favoritos
            </Text>

            <Text style={styles.subtitle}>
              Tus estaciones de radio favoritas
            </Text>
          </View>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {favorites.length}
            </Text>
          </View>
        </View>

        {/* Lista */}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) =>
              item.id.toString()
            }
            renderItem={renderStation}
            contentContainerStyle={
              styles.listContent
            }
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              ♡
            </Text>

            <Text style={styles.emptyTitle}>
              No tienes favoritos
            </Text>

            <Text style={styles.emptyDescription}>
              Agrega estaciones a favoritos para
              encontrarlas rápidamente aquí.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.light.text,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  counter: {
    minWidth: 38,
    height: 38,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: Colors.light.primary,
  },

  counterText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },

  stationCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  logoContainer: {
    width: 64,
    height: 64,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  logoPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
  },

  logoIcon: {
    fontSize: 28,
  },

  stationInfo: {
    flex: 1,
  },

  stationName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },

  frequency: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  location: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  liveContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  liveDot: {
    width: 7,
    height: 7,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: Colors.light.live,
  },

  liveText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.light.live,
  },

  favoriteButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderRadius: 21,
    backgroundColor: Colors.light.background,
  },

  favoriteIcon: {
    fontSize: 23,
    color: Colors.light.error,
  },

  pressed: {
    opacity: 0.5,
    transform: [{ scale: 0.92 }],
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 80,
  },

  emptyIcon: {
    fontSize: 64,
    color: Colors.light.textSecondary,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});