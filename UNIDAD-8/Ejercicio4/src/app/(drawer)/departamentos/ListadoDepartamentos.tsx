// src/app/(drawer)/ListadoDepartamentos.tsx

import React, { JSX, useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet, Alert, ActivityIndicator, Platform } from "react-native";
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

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(): void {
    departamentoVM.cargarDepartamentos();
  }

  function obtenerDepartamentosFiltrados(): Departamento[] {
    if (esBusquedaVacia()) {
      return departamentoVM.DepartamentoList;
    }
    
    return filtrarDepartamentosPorNombre();
  }

  function esBusquedaVacia(): boolean {
    return busqueda.trim() === "";
  }

  function filtrarDepartamentosPorNombre(): Departamento[] {
    const busquedaLower = busqueda.toLowerCase();
    
    return departamentoVM.DepartamentoList.filter((departamento) => {
      return departamento.Nombre.toLowerCase().includes(busquedaLower);
    });
  }

  function navegarAEdicion(departamento: Departamento): void {
    departamentoVM.DepartamentoSeleccionado = departamento;
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento");
  }

  function confirmarEliminacion(id: number): void {
    if (Platform.OS === 'web') {
      confirmarEliminacionWeb(id);
    } else {
      confirmarEliminacionMovil(id);
    }
  }

  function confirmarEliminacionWeb(id: number): void {
    if (window.confirm("¿Seguro que deseas eliminar el departamento?")) {
      eliminarDepartamento(id);
    }
  }

  function confirmarEliminacionMovil(id: number): void {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este departamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarDepartamento(id)
        },
      ]
    );
  }

  async function eliminarDepartamento(id: number): Promise<void> {
    try {
      await departamentoVM.eliminarDepartamento(id);
      mostrarMensajeExito();
    } catch (error) {
      mostrarMensajeError(error);
    }
  }

  function mostrarMensajeExito(): void {
    const mensaje = "Departamento eliminado correctamente";
    
    if (Platform.OS === 'web') {
      alert(mensaje);
    } else {
      Alert.alert("Éxito", mensaje);
    }
  }

  function mostrarMensajeError(error: unknown): void {
    const mensajeError = "No se puede eliminar el departamento porque tiene personas asociadas";
    
    if (Platform.OS === 'web') {
      alert(mensajeError);
    } else {
      const detalleError = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", `${mensajeError}\n${detalleError}`);
    }
  }

  function navegarACreacion(): void {
    departamentoVM.DepartamentoSeleccionado = null;
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento");
  }

  function renderizarDepartamento({ item }: { item: Departamento }): JSX.Element {
    return (
      <Elemento
        titulo={item.Nombre}
        onPress={() => navegarAEdicion(item)}
        onDelete={() => confirmarEliminacion(item.ID)}
      />
    );
  }

  function renderizarContenido(): JSX.Element {
    if (departamentoVM.isLoading) {
      return renderizarCargando();
    }
    
    const departamentosFiltrados = obtenerDepartamentosFiltrados();
    
    if (departamentosFiltrados.length === 0) {
      return renderizarListaVacia();
    }
    
    return renderizarLista(departamentosFiltrados);
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
        <Text style={styles.emptyText}>No hay departamentos para mostrar</Text>
      </View>
    );
  }

  function renderizarLista(departamentos: Departamento[]): JSX.Element {
    return (
      <FlatList
        data={departamentos}
        renderItem={renderizarDepartamento}
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
          placeholder="Buscar departamento..."
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.buttonContainer}>
        <BotonAñadir onPress={navegarACreacion} titulo="Añadir Departamento" />
      </View>

      {renderizarContenido()}
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