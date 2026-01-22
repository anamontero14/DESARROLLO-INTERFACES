// src/app/(drawer)/ListadoDepartamentos.tsx

import React, { JSX, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Elemento } from "../../../components/Elemento";
import { BotonAñadir } from "../../../components/BotonAñadir";
import { Departamento } from "../../../domain/entities/Departamento";

const ListadoDepartamentos: React.FC = observer(() => {
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const [busqueda, setBusqueda] = useState<string>("");
  const departamentosFiltrados = filtrarDepartamentos();

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    departamentoVM.cargarDepartamentos();
  }

  function filtrarDepartamentos(): Departamento[] {
    const lista = departamentoVM.DepartamentoList;
    let resultado: Departamento[] = [];

    if (busqueda.trim() === "") {
      resultado = lista;
    } else {
      const busquedaLower = busqueda.toLowerCase();
      resultado = lista.filter((dept: { Nombre: string; }) => {
        return dept.Nombre.toLowerCase().includes(busquedaLower);
      });
    }

    return resultado;
  }

  function handleEditar(departamento: Departamento): void {
    departamentoVM.DepartamentoSeleccionado = departamento;
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento");
  }

  function handleEliminar(id: number): void {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este departamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarDepartamento(id),
        },
      ]
    );
  }

  async function eliminarDepartamento(id: number): Promise<void> {
    try {
      await departamentoVM.eliminarDepartamento(id);
      Alert.alert("Éxito", "Departamento eliminado correctamente");
      cargarDatos();
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  function handleAñadir(): void {
    departamentoVM.DepartamentoSeleccionado = null;
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento");
  }

  function renderDepartamento({ item }: { item: Departamento }): JSX.Element {
    return (
      <Elemento
        titulo={item.Nombre}
        onPress={() => handleEditar(item)}
        onDelete={() => handleEliminar(item.ID)}
      />
    );
  }

  function renderContenido(): JSX.Element {
    let contenido: JSX.Element = <View />;

    if (departamentoVM.isLoading) {
      contenido = (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    } else if (departamentosFiltrados.length === 0) {
      contenido = (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay departamentos para mostrar</Text>
        </View>
      );
    } else {
      contenido = (
        <FlatList
          data={departamentosFiltrados}
          renderItem={renderDepartamento}
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
          placeholder="Buscar departamento..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BotonAñadir onPress={handleAñadir} titulo="Añadir Departamento" />
      </View>

      {renderContenido()}
    </View>
  );
});

export default ListadoDepartamentos;

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