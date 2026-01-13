// src/components/Elemento.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ElementoProps {
  titulo: string;
  subtitulo?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

export const Elemento: React.FC<ElementoProps> = ({ 
  titulo, 
  subtitulo, 
  onPress, 
  onDelete 
}) => {
  const handlePress = (): void => {
    if (onPress) {
      onPress();
    }
  };

  const handleDelete = (): void => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={handlePress}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
      </TouchableOpacity>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "#FF3B30",
    borderRadius: 15,
  },
  deleteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});