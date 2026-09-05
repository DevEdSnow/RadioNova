import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { Station, StationCategory } from "@/types/station";

interface StationsScreenProps {
  stations?: Station[];
  onStationPress?: (station: Station) => void;
  onFavoritePress?: (station: Station) => void;
}

const CATEGORY_LABELS: Record<StationCategory, string> = {
  [StationCategory.MUSIC]: "Música",
  [StationCategory.NEWS]: "Noticias",
  [StationCategory.SPORTS]: "Deportes",
  [StationCategory.ROCK]: "Rock",
  [StationCategory.POP]: "Pop",
  [StationCategory.ELECTRONIC]: "Electrónica",
  [StationCategory.REGIONAL]: "Regional",
  [StationCategory.CULTURE]: "Cultura",
  [StationCategory.TALK]: "Talk",
  [StationCategory.RELIGIOUS]: "Religiosa",
  [StationCategory.VARIETY]: "Variedades",
};

export default function StationsScreen({
  stations = [],
  onStationPress,
  onFavoritePress,
}: StationsScreenProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<StationCategory | null>(null);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const categories = Object.values(StationCategory);

  const filteredStations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return stations.filter((station) => {
      const matchesSearch =
        !normalizedSearch ||
        station.name.toLowerCase().includes(normalizedSearch) ||
        station.description?.toLowerCase().includes(normalizedSearch) ||
        station.slogan?.toLowerCase().includes(normalizedSearch) ||
        station.frequency?.toLowerCase().includes(normalizedSearch) ||
        station.location?.city
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        !selectedCategory ||
        station.category === selectedCategory;

      const matchesLive =
        !showLiveOnly || station.isLive;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLive &&
        station.isActive
      );
    });
  }, [stations, search, selectedCategory, showLiveOnly]);

  const renderStation = ({ item }: { item: Station }) => {
    return (
      <TouchableOpacity
        style={styles.stationCard}
        onPress={() => onStationPress?.(item)}
        activeOpacity={0.85}
      >
        <View style={styles.imageContainer}>
          {item.logoUrl ? (
            <Image
              source={{ uri: item.logoUrl }}
              style={styles.stationImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>📻</Text>
            </View>
          )}

          {item.isLive && (
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>EN VIVO</Text>
            </View>
          )}
        </View>

        <View style={styles.stationInfo}>
          <View style={styles.titleRow}>
            <Text
              style={styles.stationName}
              numberOfLines={1}
            >
              {item.name}
            </Text>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={(event) => {
                event.stopPropagation();
                onFavoritePress?.(item);
              }}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.favoriteIcon,
                  item.isFavorite && styles.favoriteActive,
                ]}
              >
                {item.isFavorite ? "♥" : "♡"}
              </Text>
            </TouchableOpacity>
          </View>

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

          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {CATEGORY_LABELS[item.category]}
              </Text>
            </View>

            {item.location?.city && (
              <Text
                style={styles.location}
                numberOfLines={1}
              >
                📍 {item.location.city}
              </Text>
            )}
          </View>

          {item.listeners !== undefined && (
            <Text style={styles.listeners}>
              👥 {item.listeners.toLocaleString()} oyentes
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStation}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Estaciones</Text>

                <Text style={styles.subtitle}>
                  Explora las estaciones disponibles en RadioNova
                </Text>
              </View>

              <View style={styles.radioIconContainer}>
                <Text style={styles.radioIcon}>📻</Text>
              </View>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔎</Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar estación..."
                placeholderTextColor={
                  Colors.light.textSecondary
                }
                style={styles.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearText}>×</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Live filter */}
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>
                Filtros
              </Text>

              <TouchableOpacity
                style={[
                  styles.liveFilter,
                  showLiveOnly && styles.liveFilterActive,
                ]}
                onPress={() => setShowLiveOnly(!showLiveOnly)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.filterLiveDot,
                    showLiveOnly &&
                      styles.filterLiveDotActive,
                  ]}
                />

                <Text
                  style={[
                    styles.liveFilterText,
                    showLiveOnly &&
                      styles.liveFilterTextActive,
                  ]}
                >
                  Solo en vivo
                </Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.categoriesList}
              renderItem={({ item }) => {
                const isSelected =
                  selectedCategory === item;

                return (
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      isSelected &&
                        styles.categoryButtonActive,
                    ]}
                    onPress={() =>
                      setSelectedCategory(
                        isSelected ? null : item
                      )
                    }
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        isSelected &&
                          styles.categoryButtonTextActive,
                      ]}
                    >
                      {CATEGORY_LABELS[item]}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />

            {/* Result count */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                Estaciones disponibles
              </Text>

              <Text style={styles.resultsCount}>
                {filteredStations.length}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📻</Text>

            <Text style={styles.emptyTitle}>
              No encontramos estaciones
            </Text>

            <Text style={styles.emptyText}>
              Intenta cambiar tu búsqueda o seleccionar
              otra categoría.
            </Text>

            {(search || selectedCategory || showLiveOnly) && (
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSearch("");
                  setSelectedCategory(null);
                  setShowLiveOnly(false);
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.resetButtonText}>
                  Limpiar filtros
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  content: {
    paddingBottom: 110,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.light.text,
  },

  subtitle: {
    maxWidth: 280,
    marginTop: 5,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textSecondary,
  },

  radioIconContainer: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
  },

  radioIcon: {
    fontSize: 28,
  },

  searchContainer: {
    height: 52,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 9,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: Colors.light.text,
  },

  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  clearText: {
    fontSize: 22,
    lineHeight: 22,
    color: Colors.light.textSecondary,
  },

  filterHeader: {
    marginTop: 22,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },

  liveFilter: {
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  liveFilterActive: {
    borderColor: Colors.light.live,
    backgroundColor: Colors.light.live,
  },

  filterLiveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
    backgroundColor: Colors.light.textSecondary,
  },

  filterLiveDotActive: {
    backgroundColor: "#FFFFFF",
  },

  liveFilterText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.light.textSecondary,
  },

  liveFilterTextActive: {
    color: "#FFFFFF",
  },

  categoriesList: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 8,
  },

  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  categoryButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },

  categoryButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.text,
  },

  categoryButtonTextActive: {
    color: "#FFFFFF",
  },

  resultsHeader: {
    marginTop: 22,
    marginBottom: 4,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  resultsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.text,
  },

  resultsCount: {
    minWidth: 30,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "800",
    color: Colors.light.primary,
    backgroundColor: Colors.light.card,
  },

  stationCard: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 13,
    borderRadius: 18,
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  imageContainer: {
    width: 100,
    height: 100,
    position: "relative",
  },

  stationImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },

  imagePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  placeholderIcon: {
    fontSize: 38,
  },

  liveBadge: {
    position: "absolute",
    left: 6,
    bottom: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.live,
  },

  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 4,
    backgroundColor: "#FFFFFF",
  },

  liveText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  stationInfo: {
    flex: 1,
    marginLeft: 13,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  stationName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    color: Colors.light.text,
  },

  favoriteButton: {
    width: 32,
    height: 32,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 23,
    color: Colors.light.textSecondary,
  },

  favoriteActive: {
    color: Colors.light.error,
  },

  frequency: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.primary,
  },

  slogan: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  categoryBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: Colors.light.background,
  },

  categoryText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.light.primary,
  },

  location: {
    flex: 1,
    marginLeft: 8,
    fontSize: 10,
    color: Colors.light.textSecondary,
  },

  listeners: {
    marginTop: 6,
    fontSize: 10,
    color: Colors.light.textSecondary,
  },

  emptyContainer: {
    paddingHorizontal: 30,
    paddingTop: 65,
    alignItems: "center",
  },

  emptyIcon: {
    fontSize: 60,
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.light.text,
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    color: Colors.light.textSecondary,
  },

  resetButton: {
    marginTop: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
  },

  resetButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});