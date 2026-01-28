// src/app/(drawer)/ListadoDepartamentos.tsx

import React, { JSX, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Elemento } from "../../../components/Elemento";
import { BotonAñadir } from "../../../components/BotonAñadir";
import { Departamento } from "../../../domain/entities/Departamento";

const ListadoDepartamentos: React.FC = observer(() => {
  //objeto que hace referencia al viewmodel para poder usar sus métodos
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  //objeto router para poder navegar con useRouter
  const router = useRouter();

  //carga inicial: cuando el componente se monta, llama a cargarDatos()
  useEffect(() => {
    cargarDatos();
  }, []);

  //función que carga los datos del viewmodel
  function cargarDatos(): void {
    departamentoVM.cargarDepartamentos();
  }

  function confirmarEliminacion(id: number): void {
    //comprueba que la plataforma sea web
    if (Platform.OS === "web") {
      //confirmación en web
      if (window.confirm("¿Seguro que deseas eliminar el departamento?")) {
        eliminarDepartamento(id);
      }
    } else {
      //confirmación en móvil
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
  }

  //función asíncrona que elimina un departamento
  async function eliminarDepartamento(id: number): Promise<void> {
    try {
      const mensaje = "Departamento eliminado correctamente";
      await departamentoVM.eliminarDepartamento(id);

      if (Platform.OS === "web") {
        alert(mensaje);
      } else {
        Alert.alert("Éxito", mensaje);
      }
    } catch (error) {
      const mensajeBase = "No se puede eliminar el departamento porque tiene personas asociadas";
      const detalle = error instanceof Error ? error.message : "Error desconocido";

      if (Platform.OS === "web") {
        alert(mensajeBase);
      } else {
        Alert.alert("Error", `${mensajeBase}\n${detalle}`);
      }
    }
  }

  //función que sirve para navegar a la pantalla de editar
  //selecciona en el viewmodel el departamento pulsado
  function navegarAEdicion(departamento: Departamento): void {
    departamentoVM.DepartamentoSeleccionado = departamento;
    router.push("/(drawer)/departamentos/EditarInsertarDepartamento");
  }

  //función para navegar a la vista de creación
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

  //función para renderizar contenido
  function renderizarContenido(): JSX.Element {
    if (departamentoVM.isLoading) {
      return renderizarCargando();
    }

    if (departamentoVM.DepartamentoList.length === 0) {
      return renderizarListaVacia();
    }

    return renderizarLista(departamentoVM.DepartamentoList);
  }

  //renderiza el cargando
  function renderizarCargando(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // renderiza la vista cuando la lista está vacía
  function renderizarListaVacia(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay departamentos para mostrar</Text>
      </View>
    );
  }

  // renderiza la lista de departamentos
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Departamentos</Text>
        <Text style={styles.headerSubtitle}>
          {departamentoVM.DepartamentoList.length}{" "}
          {departamentoVM.DepartamentoList.length === 1 ? "departamento" : "departamentos"}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <BotonAñadir onPress={navegarACreacion} titulo="➕ Añadir Departamento" />
      </View>

      {renderizarContenido()}
    </View>
  );
});

export default ListadoDepartamentos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
    color: "#999",
  },
});
