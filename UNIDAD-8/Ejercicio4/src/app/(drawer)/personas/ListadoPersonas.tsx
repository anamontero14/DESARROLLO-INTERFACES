// src/app/(drawer)/ListadoPersonas.tsx

import React, { JSX, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
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
  const personasFiltradas = filtrarPersonas();

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    personaVM.cargarPersonas();
  }

  function filtrarPersonas(): Persona[] {
    const lista = personaVM.PersonaList;
    let resultado: Persona[] = [];

    if (busqueda.trim() === "") {
      resultado = lista;
    } else {
      const busquedaLower = busqueda.toLowerCase();
      resultado = lista.filter((persona: { Nombre: any; Apellidos: any; }) => {
        const nombreCompleto = `${persona.Nombre} ${persona.Apellidos}`.toLowerCase();
        return nombreCompleto.includes(busquedaLower);
      });
    }

    return resultado;
  }

  function handleEditar(persona: Persona): void {
    personaVM.PersonaSeleccionada = persona;
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  function handleEliminar(id: number): void {
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
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  function handleAñadir(): void {
    personaVM.PersonaSeleccionada = null;
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  function renderPersona({ item }: { item: Persona }): JSX.Element {
    return (
      <Elemento
        titulo={`${item.Nombre} ${item.Apellidos}`}
        subtitulo={item.Telefono}
        onPress={() => handleEditar(item)}
        onDelete={() => handleEliminar(item.ID)}
      />
    );
  }

  function renderContenido(): JSX.Element {
    let contenido: JSX.Element = <View />;

    if (personaVM.isLoading) {
      contenido = (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    } else if (personasFiltradas.length === 0) {
      contenido = (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay personas para mostrar</Text>
        </View>
      );
    } else {
      contenido = (
        <FlatList
          data={personasFiltradas}
          renderItem={renderPersona}
          keyExtractor={(item) => item.ID.toString()}
          contentContainerStyle={styles.listContent}
        />
      );
    }

    return contenido;
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
        <BotonAñadir onPress={handleAñadir} titulo="Añadir Persona" />
      </View>

      {renderContenido()}
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