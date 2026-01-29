// src/app/(drawer)/EditarInsertarDepartamento.tsx

import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter, useFocusEffect } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Departamento } from "../../../domain/entities/Departamento";
import { BotonSubmit } from "../../../components/BotonSubmit";

const EditarInsertarDepartamento: React.FC = observer(() => {
  //constante que servirá para obtener los métodos del viewmodel
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  //constante que nos sirve para poder usar métodos para movernos entre pantallas
  const router = useRouter();

  //atributo que hace un departamento
  const [nombre, setNombre] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      //a una constante se le iguala un booleano comprobando si el departamento seleccionado
      //es null o no, si es null significa que hay que crear un departamento y si
      //NO es null significa que estamos en la vista de editar
      const esEdicion = departamentoVM.DepartamentoSeleccionado !== null;
      
      //si es true significa que estamos en edicion
      if (esEdicion) {
        //la constante departamento se iguala a la que se obtiene del viewmodel
        //indicándole que NO es null
        const departamento = departamentoVM.DepartamentoSeleccionado!;
        //se settea el atributo del departamento al del departamento seleccionado
        setNombre(departamento.Nombre);
      } else {
        //si no estamos en la lista de editar entonces se está creando
        //un nuevo departamento entonces iguala el campo a vacío
        setNombre("");
      }
    }, [departamentoVM.DepartamentoSeleccionado?.ID])
  );

  //función que se encarga de comprobar que el formulario esté
  //bien formado y con todos los campos obligatorios rellenos
  function validarFormulario(): boolean {
    //utiliza una variable auxiliar para comprobar que el campo es válido
    let esValido = false;
    
    const nombreValido = nombre.trim() !== "";

    if (!nombreValido) {
      Alert.alert("Error", "El nombre del departamento es obligatorio");
      return esValido;
    }

    esValido = true;
    return esValido;
  }

  //función asíncrona que gestiona la función de guardar
  async function handleGuardar(): Promise<void> {
    //se almacena en una variable si el formulario es válido o no
    const formularioValido = validarFormulario();
    //si el formulario no es válido se acaba ahí la ejecución
    if (!formularioValido) {
      return;
    }

    //se almacena en la constante si hay un departamento seleccionado o no
    //comprobando así si estamos en la edición de departamentos o no
    const esEdicion = departamentoVM.DepartamentoSeleccionado !== null;
    //si edición es true usa el id del departamento seleccionado, si no usa 0
    const idDepartamento = esEdicion ? departamentoVM.DepartamentoSeleccionado!.ID : 0;
    //se crea un nuevo departamento
    const departamento = new Departamento(idDepartamento, nombre);

    try {
      //dependiendo de en qué vista estemos se manda un mensaje u otro
      const mensajeExito = esEdicion ? "Departamento actualizado correctamente" : "Departamento creado correctamente";
      //si estamos en la vista de edición
      if (esEdicion) {
        //se edita el departamento mediante el método del viewmodel que pide su id y el objeto del departamento
        await departamentoVM.editarDepartamento(departamento.ID, departamento);
      } else {
        //si no crea un departamento
        await departamentoVM.crearDepartamento(departamento);
      }

      //dependiendo de la plataforma en la que esté utiliza una alerta u otra
      if (Platform.OS == "web") {
        alert("Éxito: " + mensajeExito);
      } else {
        Alert.alert("Éxito", mensajeExito);
      }
      
      //se vuelve a inicializar el campo a vacío
      setNombre("");
      //se vuelve a la vista del listado de departamentos
      router.push("/(drawer)/departamentos/ListadoDepartamentos");
    } catch (error) {
      //constante que almacena el mensaje de error
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      //dependiendo de la plataforma se manda un tipo de alerta u otro
      if (Platform.OS == "web") {
        alert("Error: " + mensaje);
      } else {
        Alert.alert("Error", mensaje);
      }
    }
  }

  //se almacena true o false dependiendo de si el departamento es null o no
  const esEdicion = departamentoVM.DepartamentoSeleccionado !== null;
  //dependiendo tmb de si edición es true o false el titulo será uno u otro
  const titulo = esEdicion ? "Editar Departamento" : "Nuevo Departamento";
  const textoBoton = esEdicion ? "💾 Actualizar" : "➕ Crear";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{titulo}</Text>
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
          titulo={textoBoton}
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