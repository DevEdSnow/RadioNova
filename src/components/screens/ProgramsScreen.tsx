import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { Station } from "@/types/station";

interface Program {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  host?: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  stationId: number;
  isLive?: boolean;
}

interface ProgramsScreenProps {
  stations?: Station[];
  programs?: Program[];
  selectedStationId?: number;
  onProgramPress?: (program: Program) => void;
}

const DAYS = [
  { id: 1, name: "Lun", fullName: "Lunes" },
  { id: 2, name: "Mar", fullName: "Martes" },
  { id: 3, name: "Mié", fullName: "Miércoles" },
  { id: 4, name: "Jue", fullName: "Jueves" },
  { id: 5, name: "Vie", fullName: "Viernes" },
  { id: 6, name: "Sáb", fullName: "Sábado" },
  { id: 7, name: "Dom", fullName: "Domingo" },
];

export default function ProgramsScreen({
  stations = [],
  programs = [],
  selectedStationId,
  onProgramPress,
}: ProgramsScreenProps) {
  const currentDay = new Date().getDay() || 7;

  const [selectedDay, setSelectedDay] = useState<number>(currentDay);
  const [selectedStation, setSelectedStation] = useState<number | undefined>(
    selectedStationId
  );

  const filteredPrograms = useMemo(() => {
    return programs
      .filter((program) => {
        const matchesDay = program.dayOfWeek === selectedDay;

        const matchesStation =
          !selectedStation || program.stationId === selectedStation;

        return matchesDay && matchesStation;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [programs, selectedDay, selectedStation]);

  const selectedStationData = stations.find(
    (station) => station.id === selectedStation
  );

  const renderStation = ({ item }: { item: Station }) => {
    const isSelected = selectedStation === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.stationButton,
          isSelected && styles.stationButtonActive,
        ]}
        onPress={() =>
          setSelectedStation(isSelected ? undefined : item.id)
        }
        activeOpacity={0.8}
      >
        {item.logoUrl ? (
          <Image
            source={{ uri: item.logoUrl }}
            style={styles.stationLogo}
          />
        ) : (
          <View style={styles.stationLogoPlaceholder}>
            <Text style={styles.stationLogoText}>📻</Text>
          </View>
        )}

        <Text
          style={[
            styles.stationName,
            isSelected && styles.stationNameActive,
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProgram = ({ item }: { item: Program }) => {
    const station = stations.find(
      (stationItem) => stationItem.id === item.stationId
    );

    return (
      <TouchableOpacity
        style={styles.programCard}
        onPress={() => onProgramPress?.(item)}
        activeOpacity={0.85}
      >
        <View style={styles.timeContainer}>
          <Text style={styles.startTime}>{item.startTime}</Text>

          <View style={styles.timeLine}>
            <View style={styles.timeDot} />
            <View style={styles.line} />
          </View>

          <Text style={styles.endTime}>{item.endTime}</Text>
        </View>

        <View style={styles.programContent}>
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.programImage}
            />
          ) : station?.logoUrl ? (
            <Image
              source={{ uri: station.logoUrl }}
              style={styles.programImage}
            />
          ) : (
            <View style={styles.programImagePlaceholder}>
              <Text style={styles.programImageText}>🎙️</Text>
            </View>
          )}

          <View style={styles.programInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.programName} numberOfLines={2}>
                {item.name}
              </Text>

              {item.isLive && (
                <View style={styles.liveBadge}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveText}>EN VIVO</Text>
                </View>
              )}
            </View>

            {item.host && (
              <Text style={styles.host} numberOfLines={1}>
                🎙️ {item.host}
              </Text>
            )}

            {item.description && (
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            )}

            {station && (
              <Text style={styles.stationText} numberOfLines={1}>
                📻 {station.name}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredPrograms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProgram}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Programación</Text>
              <Text style={styles.subtitle}>
                Descubre qué está sonando hoy en RadioNova
              </Text>
            </View>

            {stations.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Estación</Text>

                <FlatList
                  data={stations}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderStation}
                  contentContainerStyle={styles.stationsList}
                />
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Día</Text>

              <FlatList
                data={DAYS}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.daysList}
                renderItem={({ item }) => {
                  const isSelected = selectedDay === item.id;

                  return (
                    <TouchableOpacity
                      style={[
                        styles.dayButton,
                        isSelected && styles.dayButtonActive,
                      ]}
                      onPress={() => setSelectedDay(item.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.dayName,
                          isSelected && styles.dayNameActive,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            {selectedStationData && (
              <View style={styles.selectedStationCard}>
                {selectedStationData.logoUrl ? (
                  <Image
                    source={{ uri: selectedStationData.logoUrl }}
                    style={styles.selectedStationLogo}
                  />
                ) : (
                  <View style={styles.selectedStationPlaceholder}>
                    <Text>📻</Text>
                  </View>
                )}

                <View style={styles.selectedStationInfo}>
                  <Text style={styles.selectedStationName}>
                    {selectedStationData.name}
                  </Text>

                  {selectedStationData.frequency && (
                    <Text style={styles.frequency}>
                      {selectedStationData.frequency}
                    </Text>
                  )}
                </View>
              </View>
            )}

            <View style={styles.programHeader}>
              <Text style={styles.sectionTitle}>
                {DAYS.find((day) => day.id === selectedDay)?.fullName}
              </Text>

              <Text style={styles.programCount}>
                {filteredPrograms.length}{" "}
                {filteredPrograms.length === 1 ? "programa" : "programas"}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📻</Text>

            <Text style={styles.emptyTitle}>
              No hay programas disponibles
            </Text>

            <Text style={styles.emptyText}>
              No encontramos programación para este día o estación.
            </Text>
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
    paddingBottom: 120,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: Colors.light.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: Colors.light.textSecondary,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    marginLeft: 20,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },

  stationsList: {
    paddingHorizontal: 20,
    gap: 10,
  },

  stationButton: {
    width: 105,
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  stationButtonActive: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary,
  },

  stationLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 7,
  },

  stationLogoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  stationLogoText: {
    fontSize: 22,
  },

  stationName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "center",
  },

  stationNameActive: {
    color: "#FFFFFF",
  },

  daysList: {
    paddingHorizontal: 20,
    gap: 8,
  },

  dayButton: {
    width: 55,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  dayButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },

  dayName: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.text,
  },

  dayNameActive: {
    color: "#FFFFFF",
  },

  selectedStationCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  selectedStationLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  selectedStationPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  selectedStationInfo: {
    flex: 1,
    marginLeft: 12,
  },

  selectedStationName: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },

  frequency: {
    marginTop: 3,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  programHeader: {
    marginTop: 24,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  programCount: {
    marginRight: 20,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  programCard: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 14,
    borderRadius: 18,
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  timeContainer: {
    width: 52,
    alignItems: "center",
  },

  startTime: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.light.primary,
  },

  endTime: {
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  timeLine: {
    flex: 1,
    width: 20,
    alignItems: "center",
    marginVertical: 4,
  },

  timeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.light.primary,
  },

  line: {
    flex: 1,
    width: 2,
    marginTop: 2,
    backgroundColor: Colors.light.border,
  },

  programContent: {
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
  },

  programImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
  },

  programImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  programImageText: {
    fontSize: 28,
  },

  programInfo: {
    flex: 1,
    marginLeft: 12,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  programName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },

  liveBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
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

  host: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  description: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: Colors.light.textSecondary,
  },

  stationText: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: "600",
    color: Colors.light.primary,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingTop: 60,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
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
});