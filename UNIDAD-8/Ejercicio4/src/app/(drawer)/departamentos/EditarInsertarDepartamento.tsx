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
      router.back();
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
    return esEdicion() ? "Actualizar" : "Crear";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{obtenerTitulo()}</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del Departamento *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingrese el nombre del departamento"
          />
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
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});