import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { News, NewsCategory } from "@/types/news";

interface NewsScreenProps {
  news?: News[];
  onNewsPress?: (item: News) => void;
}

export default function NewsScreen({
  news = [],
  onNewsPress,
}: NewsScreenProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategory | null>(null);

  /**
   * Filtrar noticias
   */
  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return news.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.author?.toLowerCase().includes(query) ||
        item.source?.toLowerCase().includes(query) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      const matchesCategory =
        !selectedCategory ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [news, search, selectedCategory]);

  /**
   * Formatear fecha
   */
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /**
   * Nombre de categoría
   */
  const getCategoryName = (
    category: NewsCategory
  ) => {
    const categories: Record<
      NewsCategory,
      string
    > = {
      [NewsCategory.GENERAL]: "General",
      [NewsCategory.MUSIC]: "Música",
      [NewsCategory.ENTERTAINMENT]:
        "Entretenimiento",
      [NewsCategory.TECHNOLOGY]: "Tecnología",
      [NewsCategory.SPORTS]: "Deportes",
      [NewsCategory.CULTURE]: "Cultura",
      [NewsCategory.LOCAL]: "Local",
      [NewsCategory.NATIONAL]: "Nacional",
      [NewsCategory.INTERNATIONAL]:
        "Internacional",
    };

    return categories[category];
  };

  /**
   * Renderizar noticia
   */
  const renderNews = ({
    item,
  }: {
    item: News;
  }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.newsCard,
          pressed && styles.pressed,
        ]}
        onPress={() => onNewsPress?.(item)}
      >
        {/* Imagen */}
        <View style={styles.imageContainer}>
          {item.imageUrl ? (
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderIcon}>
                📰
              </Text>
            </View>
          )}

          {/* Noticia destacada */}
          {item.featured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>
                DESTACADA
              </Text>
            </View>
          )}
        </View>

        {/* Contenido */}
        <View style={styles.newsContent}>
          {/* Categoría */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>
              {getCategoryName(item.category)}
            </Text>
          </View>

          {/* Título */}
          <Text
            style={styles.newsTitle}
            numberOfLines={3}
          >
            {item.title}
          </Text>

          {/* Resumen */}
          <Text
            style={styles.summary}
            numberOfLines={2}
          >
            {item.summary}
          </Text>

          {/* Autor / fuente */}
          <View style={styles.metadata}>
            {item.author && (
              <Text
                style={styles.metadataText}
                numberOfLines={1}
              >
                Por {item.author}
              </Text>
            )}

            {item.source && (
              <Text
                style={styles.metadataText}
                numberOfLines={1}
              >
                {item.source}
              </Text>
            )}
          </View>

          {/* Fecha */}
          <Text style={styles.date}>
            {formatDate(item.publishedAt)}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Noticias
            </Text>

            <Text style={styles.subtitle}>
              Mantente informado con RadioNova
            </Text>
          </View>

          <View style={styles.newsIcon}>
            <Text style={styles.newsIconText}>
              📰
            </Text>
          </View>
        </View>

        {/* Buscador */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar noticias..."
            placeholderTextColor={
              Colors.light.textSecondary
            }
            style={styles.searchInput}
            returnKeyType="search"
          />

          {search.length > 0 && (
            <Pressable
              onPress={() => setSearch("")}
              style={styles.clearButton}
            >
              <Text style={styles.clearText}>
                ×
              </Text>
            </Pressable>
          )}
        </View>

        {/* Categorías */}
        <FlatList
          horizontal
          data={[
            null,
            ...Object.values(NewsCategory),
          ]}
          keyExtractor={(item, index) =>
            item ?? `all-${index}`
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.categoriesContent
          }
          style={styles.categoriesList}
          renderItem={({ item }) => {
            const isSelected =
              selectedCategory === item;

            return (
              <Pressable
                onPress={() =>
                  setSelectedCategory(item)
                }
                style={[
                  styles.categoryButton,
                  isSelected &&
                    styles.categoryButtonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    isSelected &&
                      styles.categoryButtonTextSelected,
                  ]}
                >
                  {item
                    ? getCategoryName(item)
                    : "Todas"}
                </Text>
              </Pressable>
            );
          }}
        />

        {/* Encabezado de resultados */}
        <View style={styles.resultsHeader}>
          <View>
            <Text style={styles.resultsTitle}>
              Últimas noticias
            </Text>

            {selectedCategory && (
              <Text style={styles.selectedCategory}>
                {getCategoryName(selectedCategory)}
              </Text>
            )}
          </View>

          <Text style={styles.resultsCount}>
            {filteredNews.length}{" "}
            {filteredNews.length === 1
              ? "noticia"
              : "noticias"}
          </Text>
        </View>

        {/* Lista de noticias */}
        {filteredNews.length > 0 ? (
          <FlatList
            data={filteredNews}
            keyExtractor={(item) =>
              item.id.toString()
            }
            renderItem={renderNews}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.listContent
            }
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              {search || selectedCategory
                ? "🔎"
                : "📰"}
            </Text>

            <Text style={styles.emptyTitle}>
              {search || selectedCategory
                ? "No se encontraron noticias"
                : "No hay noticias disponibles"}
            </Text>

            <Text style={styles.emptyDescription}>
              {search || selectedCategory
                ? "Intenta cambiar la búsqueda o seleccionar otra categoría."
                : "Las noticias aparecerán aquí cuando estén disponibles."}
            </Text>

            {(search || selectedCategory) && (
              <Pressable
                onPress={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
                style={({ pressed }) => [
                  styles.clearSearchButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={styles.clearSearchButtonText}
                >
                  Limpiar filtros
                </Text>
              </Pressable>
            )}
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
    paddingBottom: 18,
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

  newsIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
  },

  newsIconText: {
    fontSize: 23,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    marginBottom: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 8,
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
  },

  clearText: {
    fontSize: 24,
    lineHeight: 25,
    color: Colors.light.textSecondary,
  },

  categoriesList: {
    marginBottom: 16,
    flexGrow: 0,
  },

  categoriesContent: {
    gap: 8,
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  categoryButtonSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },

  categoryButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },

  categoryButtonTextSelected: {
    color: "#FFFFFF",
  },

  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  resultsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.text,
  },

  selectedCategory: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  resultsCount: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  listContent: {
    paddingBottom: 30,
  },

  newsCard: {
    flexDirection: "row",
    marginBottom: 12,
    padding: 10,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  imageContainer: {
    width: 110,
    height: 125,
    position: "relative",
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
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
    fontSize: 32,
  },

  featuredBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: Colors.light.primary,
  },

  featuredText: {
    fontSize: 7,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  newsContent: {
    flex: 1,
    justifyContent: "center",
  },

  categoryContainer: {
    alignSelf: "flex-start",
    marginBottom: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: Colors.light.background,
  },

  categoryText: {
    fontSize: 9,
    fontWeight: "800",
    color: Colors.light.primary,
  },

  newsTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },

  summary: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.light.textSecondary,
  },

  metadata: {
    marginTop: 6,
    flexDirection: "row",
    gap: 8,
  },

  metadataText: {
    flexShrink: 1,
    fontSize: 10,
    color: Colors.light.textSecondary,
  },

  date: {
    marginTop: 5,
    fontSize: 10,
    color: Colors.light.textSecondary,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingBottom: 80,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: Colors.light.text,
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },

  clearSearchButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.primary,
  },

  clearSearchButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});