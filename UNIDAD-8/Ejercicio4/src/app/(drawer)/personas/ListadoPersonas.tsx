// src/app/(drawer)/ListadoPersonas.tsx

import React, { JSX, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert, ActivityIndicator, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { PersonaViewModel } from "../../../presenter/viewmodels/PersonaVM";
import { Elemento } from "../../../components/Elemento";
import { BotonAñadir } from "../../../components/BotonAñadir";
import { Persona } from "../../../domain/entities/Persona";

const ListadoPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonaViewModel>(TYPES.PersonaViewModel);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    personaVM.cargarPersonas();
  }

  function obtenerPersonasFiltradas(): Persona[] {
    if (esBusquedaVacia()) {
      return personaVM.PersonaList;
    }
    
    return filtrarPersonasPorNombre();
  }

  function esBusquedaVacia(): boolean {
    return busqueda.trim() === "";
  }

  function filtrarPersonasPorNombre(): Persona[] {
    const busquedaLower = busqueda.toLowerCase();
    
    return personaVM.PersonaList.filter((persona) => {
      const nombreCompleto = construirNombreCompleto(persona);
      return nombreCompleto.includes(busquedaLower);
    });
  }

  function construirNombreCompleto(persona: Persona): string {
    return `${persona.Nombre} ${persona.Apellidos}`.toLowerCase();
  }

  function navegarAEdicion(persona: Persona): void {
    personaVM.PersonaSeleccionada = persona;
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  function confirmarEliminacion(id: number): void {
    if (Platform.OS === 'web') {
      confirmarEliminacionWeb(id);
    } else {
      confirmarEliminacionMovil(id);
    }
  }

  function confirmarEliminacionWeb(id: number): void {
    if (window.confirm("¿Seguro que deseas eliminar a la persona?")) {
      eliminarPersona(id);
    }
  }

  function confirmarEliminacionMovil(id: number): void {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta persona?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarPersona(id),
        },
      ]
    );
  }

  async function eliminarPersona(id: number): Promise<void> {
    try {
      await personaVM.eliminarPersona(id);
      mostrarMensajeExito();
    } catch (error) {
      mostrarMensajeError(error);
    }
  }

  function mostrarMensajeExito(): void {
    const mensaje = "Persona eliminada correctamente";
    
    if (Platform.OS === 'web') {
      alert(mensaje);
    } else {
      Alert.alert("Éxito", mensaje);
    }
  }

  function mostrarMensajeError(error: unknown): void {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    
    if (Platform.OS === 'web') {
      alert(`Error: ${mensaje}`);
    } else {
      Alert.alert("Error", mensaje);
    }
  }

  function navegarACreacion(): void {
    personaVM.PersonaSeleccionada = null;
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  function renderizarPersona({ item }: { item: Persona }): JSX.Element {
    return (
      <Elemento
        titulo={`${item.Nombre} ${item.Apellidos}`}
        subtitulo={item.Telefono}
        onPress={() => navegarAEdicion(item)}
        onDelete={() => confirmarEliminacion(item.ID)}
      />
    );
  }

  function renderizarContenido(): JSX.Element {
    if (personaVM.isLoading) {
      return renderizarCargando();
    }
    
    const personasFiltradas = obtenerPersonasFiltradas();
    
    if (personasFiltradas.length === 0) {
      return renderizarListaVacia();
    }
    
    return renderizarLista(personasFiltradas);
  }

  function renderizarCargando(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  function renderizarListaVacia(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay personas para mostrar</Text>
      </View>
    );
  }

  function renderizarLista(personas: Persona[]): JSX.Element {
    return (
      <FlatList
        data={personas}
        renderItem={renderizarPersona}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BotonAñadir onPress={navegarACreacion} titulo="Añadir Persona" />
      </View>

      {renderizarContenido()}
    </View>
  );
});

export default ListadoPersonas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 0,
  },
  listContent: {
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});