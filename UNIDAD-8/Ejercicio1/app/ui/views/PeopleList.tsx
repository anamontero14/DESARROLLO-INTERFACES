import React, { useCallback, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";
import { observer } from "mobx-react-lite";

const viewModel = container.get<PeopleListVM>(TYPES.IndexVM);

// --- Helper para obtener iniciales ---
const getInitials = (nombre: string, apellido: string) => {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
};

// --- Componente de Tarjeta Elegante ---
const PersonCard = ({
  item,
  onPress,
  isSelected,
}: {
  item: Persona;
  onPress: () => void;
  isSelected: boolean;
}) => {
  // Animación de escala para el efecto de pulsación
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.card, isSelected && styles.cardSelected]}
      >
        {/* Avatar Circular */}
        <View style={[styles.avatar, isSelected && styles.avatarSelected]}>
          <Text style={[styles.avatarText, isSelected && styles.avatarTextSelected]}>
            {getInitials(item.nombre, item.apellido)}
          </Text>
        </View>

        {/* Información de Texto */}
        <View style={styles.textContainer}>
          <Text style={styles.nameText}>
            {item.nombre} <Text style={styles.surnameText}>{item.apellido}</Text>
          </Text>
          <Text style={styles.subText}>Toque para ver detalles</Text>
        </View>

        {/* Indicador de Selección (Check simple) */}
        {isSelected && (
          <View style={styles.checkIndicator}>
            <Text style={styles.checkText}>✓</Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

// --- Componente Principal ---
const PeopleList = observer(() => {
  const renderItem = useCallback(({ item }: { item: Persona }) => {
    const isSelected = viewModel.personaSeleccionada?.id === item.id;
    return (
      <PersonCard
        item={item}
        onPress={() => {
          viewModel.personaSeleccionada = item;
        }}
        isSelected={isSelected}
      />
    );
  }, [viewModel.personaSeleccionada?.id]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera Limpia */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contactos</Text>
        <Text style={styles.headerSubtitle}>
          {viewModel.personasList.length} personas registradas
        </Text>
      </View>

      {/* Panel de Selección (Estilo Toast/Info) */}
      {viewModel.personaSeleccionada && (
        <View style={styles.selectionPanel}>
          <Text style={styles.selectionLabel}>Seleccionado actualmente:</Text>
          <Text style={styles.selectionValue}>
            {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellido}
          </Text>
        </View>
      )}

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay contactos disponibles</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
});

// --- Estilos "Clean UI" ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Gris muy suave, típico fondo moderno
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  // Estilos de la Tarjeta
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    // Sombras suaves (iOS & Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#6366F1", // Indigo
    backgroundColor: "#EEF2FF", // Indigo muy claro
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E7FF", // Azul pastel
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarSelected: {
    backgroundColor: "#6366F1",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4338CA",
  },
  avatarTextSelected: {
    color: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  surnameText: {
    fontWeight: "400",
  },
  subText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  checkIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Panel de selección
  selectionPanel: {
    margin: 16,
    marginBottom: 0,
    padding: 12,
    backgroundColor: "#374151", // Gris oscuro
    borderRadius: 10,
    alignItems: "center",
  },
  selectionLabel: {
    color: "#D1D5DB",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  selectionValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 2,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
});

export default PeopleList;