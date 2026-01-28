// src/components/Elemento.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface ElementoProps {
  titulo: string;
  subtitulo?: string;
  subtitulo2?: string;
  fotoUrl?: string;
  onPress?: () => void;
  onDelete?: () => void;
}

export const Elemento: React.FC<ElementoProps> = ({ 
  titulo, 
  subtitulo,
  subtitulo2,
  fotoUrl,
  onPress, 
  onDelete 
}) => {
  const [imagenError, setImagenError] = useState<boolean>(false);

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

  const renderFoto = (): JSX.Element => {
    if (fotoUrl && !imagenError) {
      return (
        <Image 
          source={{ uri: fotoUrl }} 
          style={styles.foto}
          onError={() => setImagenError(true)}
        />
      );
    }
    
    return (
      <View style={styles.fotoPlaceholder}>
        <Text style={styles.fotoPlaceholderText}>
          {titulo.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {fotoUrl !== undefined && renderFoto()}
      
      <TouchableOpacity style={styles.content} onPress={handlePress}>
        <Text style={styles.titulo}>{titulo}</Text>
        {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
        {subtitulo2 && <Text style={styles.subtitulo2}>{subtitulo2}</Text>}
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
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  fotoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  fotoPlaceholderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  subtitulo2: {
    fontSize: 14,
    color: "#007AFF",
    marginTop: 2,
    fontWeight: "500",
  },
  deleteButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
    backgroundColor: "#FF3B30",
    borderRadius: 18,
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});