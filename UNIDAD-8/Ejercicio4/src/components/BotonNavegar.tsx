// src/components/BotonNavegar.tsx

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface BotonNavegarProps {
  titulo: string;
  ruta: string;
  icono?: string;
}

export const BotonNavegar: React.FC<BotonNavegarProps> = ({ titulo, ruta }) => {
  const router = useRouter();

  function manejarPresion(): void {
    navegarARuta();
  }

  function navegarARuta(): void {
    router.push(ruta);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={manejarPresion}>
      <Text style={styles.buttonText}>{titulo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});