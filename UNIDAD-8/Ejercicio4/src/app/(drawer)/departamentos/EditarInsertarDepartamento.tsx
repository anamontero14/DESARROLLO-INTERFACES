// src/app/(drawer)/EditarInsertarDepartamento.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Departamento } from "../../../domain/entities/Departamento";
import { BotonSubmit } from "../../../components/BotonSubmit";

const EditarInsertarDepartamento: React.FC = observer(() => {
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const departamentoSeleccionado = departamentoVM.DepartamentoSeleccionado;
  const esEdicion = departamentoSeleccionado !== null;

  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    cargarDatosDepartamento();
  }, []);

  function cargarDatosDepartamento(): void {
    if (departamentoSeleccionado) {
      setNombre(departamentoSeleccionado.Nombre);
    }
  }

  function validarFormulario(): boolean {
    let esValido = false;
    const hayNombre = nombre.trim() !== "";

    if (!hayNombre) {
      Alert.alert("Error", "El nombre del departamento es obligatorio");
      esValido = false;
    } else {
      esValido = true;
    }

    return esValido;
  }

  async function handleGuardar(): Promise<void> {
    const esValido = validarFormulario();

    if (!esValido) {
      return;
    }

    const idDepartamento = departamentoSeleccionado ? departamentoSeleccionado.ID : 0;
    const departamento = new Departamento(idDepartamento, nombre);

    try {
      if (esEdicion) {
        await departamentoVM.editarDepartamento(idDepartamento, departamento);
        Alert.alert("Éxito", "Departamento actualizado correctamente");
      } else {
        await departamentoVM.crearDepartamento(departamento);
        Alert.alert("Éxito", "Departamento creado correctamente");
      }
      router.back();
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  const titulo = esEdicion ? "Editar Departamento" : "Nuevo Departamento";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{titulo}</Text>

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
          titulo={esEdicion ? "Actualizar" : "Crear"}
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