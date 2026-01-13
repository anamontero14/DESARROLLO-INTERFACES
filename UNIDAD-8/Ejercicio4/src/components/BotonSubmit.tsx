// src/components/BotonSubmit.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

interface BotonSubmitProps {
  titulo: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const BotonSubmit: React.FC<BotonSubmitProps> = ({ 
  titulo, 
  onPress, 
  disabled = false,
  isLoading = false 
}) => {
  const handlePress = (): void => {
    if (!disabled && !isLoading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, disabled && styles.buttonDisabled]} 
      onPress={handlePress}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});