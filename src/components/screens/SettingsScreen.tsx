import { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { THEMES, ThemeMode } from "@/constants/theme";
import { useAuthStore } from "@/store/authStore";

interface SettingsScreenProps {
  onBack?: () => void;
  onAboutPress?: () => void;
  onPrivacyPress?: () => void;
  onTermsPress?: () => void;
}

export default function SettingsScreen({
  onBack,
  onAboutPress,
  onPrivacyPress,
  onTermsPress,
}: SettingsScreenProps) {
  const { user } = useAuthStore();

  const [theme, setTheme] = useState<ThemeMode>(
    (user?.preferences?.theme?.toLowerCase() as ThemeMode) ??
      THEMES.SYSTEM
  );

  const [language, setLanguage] = useState(
    user?.preferences?.language ?? "es"
  );

  const [autoplay, setAutoplay] = useState(
    user?.preferences?.autoplay ?? true
  );

  const [notifications, setNotifications] = useState(
    user?.preferences?.notifications ?? true
  );

  const [showExplicitContent, setShowExplicitContent] = useState(
    user?.preferences?.showExplicitContent ?? false
  );

  useEffect(() => {
    if (user?.preferences) {
      setTheme(
        user.preferences.theme.toLowerCase() as ThemeMode
      );
      setLanguage(user.preferences.language);
      setAutoplay(user.preferences.autoplay);
      setNotifications(user.preferences.notifications);
      setShowExplicitContent(
        user.preferences.showExplicitContent
      );
    }
  }, [user]);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);

    // Aquí posteriormente puedes conectar
    // la actualización de preferencias con tu backend.
  };

  const handleLanguageChange = () => {
    const newLanguage = language === "es" ? "en" : "es";

    setLanguage(newLanguage);

    Alert.alert(
      "Idioma",
      newLanguage === "es"
        ? "El idioma se cambió a Español."
        : "Language changed to English."
    );
  };

  const renderThemeButton = (
    value: ThemeMode,
    label: string,
    icon: string
  ) => {
    const isSelected = theme === value;

    return (
      <TouchableOpacity
        style={[
          styles.themeButton,
          isSelected && styles.themeButtonActive,
        ]}
        onPress={() => handleThemeChange(value)}
        activeOpacity={0.8}
      >
        <Text style={styles.themeIcon}>{icon}</Text>

        <Text
          style={[
            styles.themeLabel,
            isSelected && styles.themeLabelActive,
          ]}
        >
          {label}
        </Text>

        {isSelected && (
          <View style={styles.checkCircle}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.8}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerSpacer} />
          )}

          <Text style={styles.headerTitle}>Configuración</Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Apariencia */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tema</Text>

            <Text style={styles.cardDescription}>
              Elige cómo quieres ver RadioNova.
            </Text>

            <View style={styles.themeContainer}>
              {renderThemeButton(
                THEMES.LIGHT,
                "Claro",
                "☀️"
              )}

              {renderThemeButton(
                THEMES.DARK,
                "Oscuro",
                "🌙"
              )}

              {renderThemeButton(
                THEMES.SYSTEM,
                "Sistema",
                "⚙️"
              )}
            </View>
          </View>
        </View>

        {/* Reproducción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reproducción</Text>

          <View style={styles.card}>
            <SettingRow
              icon="▶️"
              title="Reproducción automática"
              description="Reproducir la estación automáticamente al seleccionarla."
              value={autoplay}
              onValueChange={setAutoplay}
            />

            <View style={styles.separator} />

            <SettingRow
              icon="🔔"
              title="Notificaciones"
              description="Recibir información sobre tus estaciones y programas favoritos."
              value={notifications}
              onValueChange={setNotifications}
            />
          </View>
        </View>

        {/* Contenido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contenido</Text>

          <View style={styles.card}>
            <SettingRow
              icon="🔞"
              title="Contenido explícito"
              description="Permitir contenido marcado como explícito."
              value={showExplicitContent}
              onValueChange={setShowExplicitContent}
            />
          </View>
        </View>

        {/* Idioma */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Idioma</Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.languageRow}
              onPress={handleLanguageChange}
              activeOpacity={0.8}
            >
              <View style={styles.settingIconContainer}>
                <Text style={styles.settingIcon}>🌐</Text>
              </View>

              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>
                  Idioma de la aplicación
                </Text>

                <Text style={styles.settingDescription}>
                  {language === "es"
                    ? "Español"
                    : "English"}
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>

          <View style={styles.card}>
            <InfoRow
              icon="ℹ️"
              title="Acerca de RadioNova"
              onPress={onAboutPress}
            />

            <View style={styles.separator} />

            <InfoRow
              icon="🔒"
              title="Política de privacidad"
              onPress={onPrivacyPress}
            />

            <View style={styles.separator} />

            <InfoRow
              icon="📄"
              title="Términos y condiciones"
              onPress={onTermsPress}
            />
          </View>
        </View>

        {/* Versión */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>
            RadioNova
          </Text>

          <Text style={styles.versionNumber}>
            Versión 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingRowProps {
  icon: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingRow({
  icon,
  title,
  description,
  value,
  onValueChange,
}: SettingRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIconContainer}>
        <Text style={styles.settingIcon}>{icon}</Text>
      </View>

      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>

        <Text style={styles.settingDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: Colors.light.border,
          true: Colors.light.primary,
        }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

interface InfoRowProps {
  icon: string;
  title: string;
  onPress?: () => void;
}

function InfoRow({
  icon,
  title,
  onPress,
}: InfoRowProps) {
  return (
    <TouchableOpacity
      style={styles.infoRow}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.settingIconContainer}>
        <Text style={styles.settingIcon}>{icon}</Text>
      </View>

      <Text style={styles.infoTitle}>{title}</Text>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  content: {
    paddingBottom: 100,
  },

  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.light.text,
  },

  headerSpacer: {
    width: 40,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: Colors.light.text,
  },

  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.text,
  },

  card: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },

  cardDescription: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  themeContainer: {
    marginTop: 15,
    flexDirection: "row",
    gap: 8,
  },

  themeButton: {
    flex: 1,
    minHeight: 78,
    padding: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  themeButtonActive: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.primary,
  },

  themeIcon: {
    fontSize: 22,
    marginBottom: 5,
  },

  themeLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.light.text,
  },

  themeLabelActive: {
    color: "#FFFFFF",
  },

  checkCircle: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  checkText: {
    fontSize: 11,
    fontWeight: "800",
    color: Colors.light.primary,
  },

  settingRow: {
    minHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },

  settingIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  settingIcon: {
    fontSize: 20,
  },

  settingContent: {
    flex: 1,
    marginHorizontal: 12,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.light.textSecondary,
  },

  separator: {
    height: 1,
    marginVertical: 6,
    backgroundColor: Colors.light.border,
  },

  languageRow: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
  },

  chevron: {
    fontSize: 28,
    color: Colors.light.textSecondary,
  },

  infoRow: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
  },

  infoTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },

  versionContainer: {
    marginTop: 35,
    alignItems: "center",
  },

  versionText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.textSecondary,
  },

  versionNumber: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});