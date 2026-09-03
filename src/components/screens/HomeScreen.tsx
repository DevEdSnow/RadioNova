import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useRadioStore } from "@/store/radioStore";
import { Station } from "@/types/station";

interface HomeScreenProps {
  stations?: Station[];
  onStationPress?: (station: Station) => void;
  onSeeAllStations?: () => void;
  onFavoritesPress?: () => void;
}

export default function HomeScreen({
  stations = [],
  onStationPress,
  onSeeAllStations,
  onFavoritesPress,
}: HomeScreenProps) {
  const currentStation = useRadioStore(
    (state) => state.currentStation
  );

  const isPlaying = useRadioStore(
    (state) => state.isPlaying
  );

  const favorites = useFavoritesStore(
    (state) => state.favorites
  );

  const featuredStations = stations.slice(0, 6);

  const renderStation = ({
    item,
  }: {
    item: Station;
  }) => {
    const imageUrl =
      item.logoUrl || item.coverUrl;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.stationCard,
          pressed && styles.pressed,
        ]}
        onPress={() => onStationPress?.(item)}
      >
        <View style={styles.stationImageContainer}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={styles.stationImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>
                📻
              </Text>
            </View>
          )}

          {item.isLive && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />

              <Text style={styles.liveText}>
                EN VIVO
              </Text>
            </View>
          )}
        </View>

        <View style={styles.stationContent}>
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

          {item.slogan && (
            <Text
              style={styles.slogan}
              numberOfLines={1}
            >
              {item.slogan}
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Bienvenido a
            </Text>

            <Text style={styles.logoText}>
              RadioNova
            </Text>

            <Text style={styles.subtitle}>
              Tu música, tus estaciones.
            </Text>
          </View>

          <Pressable
            onPress={onFavoritesPress}
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.favoriteIcon}>
              ♥
            </Text>

            {favorites.length > 0 && (
              <View style={styles.favoriteBadge}>
                <Text style={styles.favoriteBadgeText}>
                  {favorites.length}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Estación actual */}
        {currentStation && (
          <View style={styles.currentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Reproduciendo ahora
              </Text>

              <View style={styles.playingBadge}>
                <View
                  style={[
                    styles.playingDot,
                    !isPlaying &&
                      styles.playingDotInactive,
                  ]}
                />

                <Text style={styles.playingText}>
                  {isPlaying
                    ? "EN VIVO"
                    : "PAUSADO"}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() =>
                onStationPress?.(currentStation)
              }
              style={({ pressed }) => [
                styles.currentCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.currentImageContainer}>
                {currentStation.logoUrl ||
                currentStation.coverUrl ? (
                  <Image
                    source={{
                      uri:
                        currentStation.logoUrl ||
                        currentStation.coverUrl,
                    }}
                    style={styles.currentImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={styles.currentPlaceholder}
                  >
                    <Text
                      style={
                        styles.currentPlaceholderIcon
                      }
                    >
                      📻
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.currentInfo}>
                <Text
                  style={styles.currentName}
                  numberOfLines={1}
                >
                  {currentStation.name}
                </Text>

                {currentStation.frequency && (
                  <Text style={styles.currentFrequency}>
                    {currentStation.frequency}
                  </Text>
                )}

                <Text style={styles.currentAction}>
                  {isPlaying
                    ? "Escuchando ahora"
                    : "Presiona para escuchar"}
                </Text>
              </View>

              <View style={styles.playCircle}>
                <Text style={styles.playIcon}>
                  {isPlaying ? "⏸" : "▶"}
                </Text>
              </View>
            </Pressable>
          </View>
        )}

        {/* Acciones rápidas */}
        <View style={styles.quickActions}>
          <Pressable
            onPress={onFavoritesPress}
            style={({ pressed }) => [
              styles.quickAction,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quickIcon}>♥</Text>

            <Text style={styles.quickTitle}>
              Favoritos
            </Text>

            <Text style={styles.quickSubtitle}>
              {favorites.length} estaciones
            </Text>
          </Pressable>

          <Pressable
            onPress={onSeeAllStations}
            style={({ pressed }) => [
              styles.quickAction,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quickIcon}>📻</Text>

            <Text style={styles.quickTitle}>
              Estaciones
            </Text>

            <Text style={styles.quickSubtitle}>
              Explorar radio
            </Text>
          </Pressable>
        </View>

        {/* Estaciones destacadas */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Estaciones destacadas
              </Text>

              <Text style={styles.sectionSubtitle}>
                Escucha tus estaciones favoritas
              </Text>
            </View>

            {onSeeAllStations && (
              <Pressable
                onPress={onSeeAllStations}
              >
                <Text style={styles.seeAll}>
                  Ver todas
                </Text>
              </Pressable>
            )}
          </View>

          {featuredStations.length > 0 ? (
            <FlatList
              data={featuredStations}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) =>
                item.id.toString()
              }
              renderItem={renderStation}
              contentContainerStyle={
                styles.stationsList
              }
            />
          ) : (
            <View style={styles.emptyStations}>
              <Text style={styles.emptyIcon}>
                📻
              </Text>

              <Text style={styles.emptyTitle}>
                No hay estaciones disponibles
              </Text>

              <Text style={styles.emptyText}>
                Las estaciones aparecerán aquí cuando
                estén disponibles.
              </Text>
            </View>
          )}
        </View>

        {/* Categorías */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>
            Explora por categoría
          </Text>

          <View style={styles.categoriesGrid}>
            <CategoryItem
              icon="🎵"
              title="Música"
            />

            <CategoryItem
              icon="📰"
              title="Noticias"
            />

            <CategoryItem
              icon="⚽"
              title="Deportes"
            />

            <CategoryItem
              icon="🎙️"
              title="Talk"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface CategoryItemProps {
  icon: string;
  title: string;
}

function CategoryItem({
  icon,
  title,
}: CategoryItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.category,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.categoryIcon}>
        {icon}
      </Text>

      <Text style={styles.categoryTitle}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },

  logoText: {
    marginTop: 2,
    fontSize: 30,
    fontWeight: "900",
    color: Colors.light.primary,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  favoriteButton: {
    position: "relative",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  favoriteIcon: {
    fontSize: 23,
    color: Colors.light.error,
  },

  favoriteBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 19,
    height: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
  },

  favoriteBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  currentSection: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: Colors.light.text,
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  playingBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  playingDot: {
    width: 7,
    height: 7,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: Colors.light.live,
  },

  playingDotInactive: {
    backgroundColor: Colors.light.textSecondary,
  },

  playingText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.light.live,
  },

  currentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 18,
    backgroundColor: Colors.light.playerBackground,
  },

  currentImageContainer: {
    width: 76,
    height: 76,
    marginRight: 12,
    borderRadius: 14,
    overflow: "hidden",
  },

  currentImage: {
    width: "100%",
    height: "100%",
  },

  currentPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
  },

  currentPlaceholderIcon: {
    fontSize: 30,
  },

  currentInfo: {
    flex: 1,
  },

  currentName: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.light.text,
  },

  currentFrequency: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  currentAction: {
    marginTop: 5,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  playCircle: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    borderRadius: 22,
    backgroundColor: Colors.light.primary,
  },

  playIcon: {
    fontSize: 18,
    color: "#FFFFFF",
  },

  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  quickAction: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  quickIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.light.text,
  },

  quickSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  featuredSection: {
    marginBottom: 28,
  },

  seeAll: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.primary,
  },

  stationsList: {
    paddingRight: 16,
  },

  stationCard: {
    width: 180,
    marginRight: 12,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  stationImageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },

  stationImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
  },

  placeholderIcon: {
    fontSize: 38,
  },

  liveBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.light.live,
  },

  liveDot: {
    width: 5,
    height: 5,
    marginRight: 4,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },

  liveText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  stationContent: {
    padding: 12,
  },

  stationName: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.text,
  },

  frequency: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  slogan: {
    marginTop: 4,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  emptyStations: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  emptyIcon: {
    fontSize: 38,
    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },

  emptyText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },

  categoriesSection: {
    marginBottom: 20,
  },

  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12,
  },

  category: {
    width: "47%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  categoryIcon: {
    fontSize: 25,
    marginBottom: 6,
  },

  categoryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.text,
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});