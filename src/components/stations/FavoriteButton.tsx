import {
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

import { Colors } from "@/constants/colors";
import { Station } from "@/types/station";

interface FavoriteButtonProps {
  station: Station;
  onPress: (station: Station) => void;
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function FavoriteButton({
  station,
  onPress,
  size = "medium",
  style,
  disabled = false,
}: FavoriteButtonProps) {
  const isFavorite = station.isFavorite;

  const sizeStyles = {
    small: {
      button: styles.smallButton,
      icon: styles.smallIcon,
    },
    medium: {
      button: styles.mediumButton,
      icon: styles.mediumIcon,
    },
    large: {
      button: styles.largeButton,
      icon: styles.largeIcon,
    },
  };

  const selectedSize = sizeStyles[size];

  const handlePress = () => {
    if (!disabled) {
      onPress(station);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        selectedSize.button,
        isFavorite && styles.activeButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        isFavorite
          ? `Quitar ${station.name} de favoritos`
          : `Agregar ${station.name} a favoritos`
      }
      accessibilityState={{
        selected: isFavorite,
        disabled,
      }}
    >
      <Text
        style={[
          styles.icon,
          selectedSize.icon,
          isFavorite && styles.activeIcon,
        ]}
      >
        {isFavorite ? "♥" : "♡"}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  smallButton: {
    width: 32,
    height: 32,
  },

  mediumButton: {
    width: 42,
    height: 42,
  },

  largeButton: {
    width: 52,
    height: 52,
  },

  icon: {
    fontWeight: "600",
    color: Colors.light.textSecondary,
  },

  smallIcon: {
    fontSize: 17,
  },

  mediumIcon: {
    fontSize: 22,
  },

  largeIcon: {
    fontSize: 28,
  },

  activeButton: {
    borderColor: Colors.light.error,
  },

  activeIcon: {
    color: Colors.light.error,
  },

  disabledButton: {
    opacity: 0.5,
  },
});