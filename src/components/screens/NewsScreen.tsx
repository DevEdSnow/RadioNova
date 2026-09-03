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
import { News } from "@/types/news";

interface NewsScreenProps {
  news?: News[];
  onNewsPress?: (item: News) => void;
}

export default function NewsScreen({
  news = [],
  onNewsPress,
}: NewsScreenProps) {
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return news;
    }

    return news.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description
          ?.toLowerCase()
          .includes(query) ||
        item.source
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [news, search]);

  const formatDate = (date?: string) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "es-MX",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

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
        </View>

        {/* Contenido */}
        <View style={styles.newsContent}>
          {item.source && (
            <Text
              style={styles.source}
              numberOfLines={1}
            >
              {item.source}
            </Text>
          )}

          <Text
            style={styles.newsTitle}
            numberOfLines={3}
          >
            {item.title}
          </Text>

          {item.description && (
            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          )}

          {item.publishedAt && (
            <Text style={styles.date}>
              {formatDate(item.publishedAt)}
            </Text>
          )}
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

        {/* Contador */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            Últimas noticias
          </Text>

          <Text style={styles.resultsCount}>
            {filteredNews.length}{" "}
            {filteredNews.length === 1
              ? "noticia"
              : "noticias"}
          </Text>
        </View>

        {/* Lista */}
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
              {search ? "🔎" : "📰"}
            </Text>

            <Text style={styles.emptyTitle}>
              {search
                ? "No se encontraron noticias"
                : "No hay noticias disponibles"}
            </Text>

            <Text style={styles.emptyDescription}>
              {search
                ? "Intenta buscar con otro término."
                : "Las noticias aparecerán aquí cuando estén disponibles."}
            </Text>

            {search.length > 0 && (
              <Pressable
                onPress={() => setSearch("")}
                style={({ pressed }) => [
                  styles.clearSearchButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={styles.clearSearchButtonText}
                >
                  Limpiar búsqueda
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
    marginBottom: 20,
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
    height: 110,
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

  newsContent: {
    flex: 1,
    justifyContent: "center",
  },

  source: {
    marginBottom: 4,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    color: Colors.light.primary,
  },

  newsTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },

  description: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.light.textSecondary,
  },

  date: {
    marginTop: 6,
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