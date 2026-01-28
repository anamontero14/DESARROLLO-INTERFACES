// src/app/(drawer)/EditarInsertarDepartamento.tsx

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter, useFocusEffect } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Departamento } from "../../../domain/entities/Departamento";
import { BotonSubmit } from "../../../components/BotonSubmit";

const EditarInsertarDepartamento: React.FC = observer(() => {
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const [nombre, setNombre] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      if (esEdicion()) {
        cargarDatosDepartamento();
      } else {
        limpiarFormulario();
      }
    }, [departamentoVM.DepartamentoSeleccionado?.ID])
  );

  function esEdicion(): boolean {
    return departamentoVM.DepartamentoSeleccionado !== null;
  }

  function cargarDatosDepartamento(): void {
    const departamento = departamentoVM.DepartamentoSeleccionado!;
    setNombre(departamento.Nombre);
  }

  function limpiarFormulario(): void {
    setNombre("");
  }

  function validarFormulario(): boolean {
    const nombreValido = nombre.trim() !== "";

    if (!nombreValido) {
      Alert.alert("Error", "El nombre del departamento es obligatorio");
      return false;
    }

    return true;
  }

  async function handleGuardar(): Promise<void> {
    if (!validarFormulario()) {
      return;
    }

    const departamento = construirDepartamento();

    try {
      if (esEdicion()) {
        await editarDepartamento(departamento);
      } else {
        await crearDepartamento(departamento);
      }
      
      limpiarFormulario();
      router.push("/(drawer)/departamentos/ListadoDepartamentos");
    } catch (error) {
      mostrarErrorGuardado(error);
    }
  }

  function construirDepartamento(): Departamento {
    const idDepartamento = esEdicion() ? departamentoVM.DepartamentoSeleccionado!.ID : 0;
    return new Departamento(idDepartamento, nombre);
  }

  async function editarDepartamento(departamento: Departamento): Promise<void> {
    await departamentoVM.editarDepartamento(departamento.ID, departamento);
    Alert.alert("Éxito", "Departamento actualizado correctamente");
  }

  async function crearDepartamento(departamento: Departamento): Promise<void> {
    await departamentoVM.crearDepartamento(departamento);
    Alert.alert("Éxito", "Departamento creado correctamente");
  }

  function mostrarErrorGuardado(error: unknown): void {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    Alert.alert("Error", mensaje);
  }

  function obtenerTitulo(): string {
    return esEdicion() ? "Editar Departamento" : "Nuevo Departamento";
  }

  function obtenerTextoBoton(): string {
    return esEdicion() ? "💾 Actualizar" : "➕ Crear";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{obtenerTitulo()}</Text>
        <Text style={styles.subtitle}>
          Los campos marcados con * son obligatorios
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏢 Información del Departamento</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre del Departamento *</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingrese el nombre del departamento"
              placeholderTextColor="#999"
            />
            <Text style={styles.helpText}>
              Ejemplo: Recursos Humanos, Ventas, Marketing, etc.
            </Text>
          </View>
        </View>

        <BotonSubmit
          titulo={obtenerTextoBoton()}
          onPress={handleGuardar}
          isLoading={departamentoVM.isLoading}
        />
      </View>
    </ScrollView>
  );
});

export default EditarInsertarDepartamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
  },
  helpText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
  },
});