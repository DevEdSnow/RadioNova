import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { Colors } from "@/constants/colors";
import { useAuthStore } from "@/store/authStore";

interface ProfileScreenProps {
  onEditProfile?: () => void;
  onSettingsPress?: () => void;
  onFavoritesPress?: () => void;
  onLogout?: () => void;
}

export default function ProfileScreen({
  onEditProfile,
  onSettingsPress,
  onFavoritesPress,
  onLogout,
}: ProfileScreenProps) {
  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: () => {
            logout();
            onLogout?.();
          },
        },
      ]
    );
  };

  const getInitials = () => {
    if (!user) {
      return "RN";
    }

    const firstName = user.nombre?.charAt(0) ?? "";
    const lastName = user.apellido?.charAt(0) ?? "";

    return (
      `${firstName}${lastName}`.toUpperCase() ||
      "RN"
    );
  };

  const fullName = user
    ? `${user.nombre ?? ""} ${user.apellido ?? ""}`.trim()
    : "Usuario de RadioNova";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Mi perfil
          </Text>

          <Text style={styles.subtitle}>
            Administra tu cuenta de RadioNova
          </Text>
        </View>

        {/* Tarjeta de usuario */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {getInitials()}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text
              style={styles.name}
              numberOfLines={1}
            >
              {fullName}
            </Text>

            {user?.correo && (
              <Text
                style={styles.email}
                numberOfLines={1}
              >
                {user.correo}
              </Text>
            )}

            {user?.telefono && (
              <Text style={styles.phone}>
                📱 {user.telefono}
              </Text>
            )}
          </View>
        </View>

        {/* Botón editar */}
        {onEditProfile && (
          <Pressable
            onPress={onEditProfile}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.editIcon}>
              ✎
            </Text>

            <Text style={styles.editText}>
              Editar perfil
            </Text>
          </Pressable>
        )}

        {/* Sección cuenta */}
        <Text style={styles.sectionTitle}>
          Cuenta
        </Text>

        <View style={styles.menuContainer}>
          {onFavoritesPress && (
            <Pressable
              onPress={onFavoritesPress}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuPressed,
              ]}
            >
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>
                  ♥
                </Text>
              </View>

              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>
                  Mis favoritos
                </Text>

                <Text style={styles.menuDescription}>
                  Consulta tus estaciones favoritas
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </Pressable>
          )}

          {onSettingsPress && (
            <Pressable
              onPress={onSettingsPress}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuPressed,
              ]}
            >
              <View style={styles.menuIconContainer}>
                <Text style={styles.menuIcon}>
                  ⚙
                </Text>
              </View>

              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>
                  Configuración
                </Text>

                <Text style={styles.menuDescription}>
                  Personaliza tu experiencia
                </Text>
              </View>

              <Text style={styles.arrow}>
                ›
              </Text>
            </Pressable>
          )}
        </View>

        {/* Información */}
        <Text style={styles.sectionTitle}>
          Información
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Aplicación
            </Text>

            <Text style={styles.infoValue}>
              RadioNova
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Versión
            </Text>

            <Text style={styles.infoValue}>
              1.0.0
            </Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Plataforma
            </Text>

            <Text style={styles.infoValue}>
              Expo
            </Text>
          </View>
        </View>

        {/* Cerrar sesión */}
        {user && (
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              styles.logoutButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.logoutIcon}>
              ⇥
            </Text>

            <Text style={styles.logoutText}>
              Cerrar sesión
            </Text>
          </Pressable>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            RadioNova
          </Text>

          <Text style={styles.footerDescription}>
            Tu radio, en cualquier lugar
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  header: {
    paddingTop: 20,
    paddingBottom: 20,
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

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 18,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  avatar: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderRadius: 36,
    backgroundColor: Colors.light.primary,
  },

  avatarText: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.light.text,
  },

  email: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  phone: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.light.textSecondary,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
  },

  editIcon: {
    marginRight: 7,
    fontSize: 18,
    color: "#FFFFFF",
  },

  editText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "800",
    color: Colors.light.text,
  },

  menuContainer: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 76,
    paddingHorizontal: 14,
  },

  menuPressed: {
    backgroundColor: Colors.light.background,
  },

  menuIconContainer: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderRadius: 21,
    backgroundColor: Colors.light.background,
  },

  menuIcon: {
    fontSize: 19,
    color: Colors.light.primary,
  },

  menuInfo: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.text,
  },

  menuDescription: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  arrow: {
    marginLeft: 8,
    fontSize: 27,
    fontWeight: "300",
    color: Colors.light.textSecondary,
  },

  infoCard: {
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
  },

  infoLabel: {
    fontSize: 13,
    color: Colors.light.textSecondary,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.light.text,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.light.border,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.error,
  },

  logoutIcon: {
    marginRight: 7,
    fontSize: 19,
    color: Colors.light.error,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.light.error,
  },

  footer: {
    alignItems: "center",
    marginTop: 30,
  },

  footerText: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.light.textSecondary,
  },

  footerDescription: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.light.textSecondary,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});