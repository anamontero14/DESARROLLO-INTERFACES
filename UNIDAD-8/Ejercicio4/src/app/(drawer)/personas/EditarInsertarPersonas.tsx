// src/app/(drawer)/EditarInsertarPersonas.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter, useFocusEffect } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { PersonaViewModel } from "../../../presenter/viewmodels/PersonaVM";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Persona } from "../../../domain/entities/Persona";
import { BotonSubmit } from "../../../components/BotonSubmit";

const EditarInsertarPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonaViewModel>(TYPES.PersonaViewModel);
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  const router = useRouter();

  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [idDepartamento, setIdDepartamento] = useState<number>(0);

  useEffect(() => {
    departamentoVM.cargarDepartamentos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (esEdicion()) {
        cargarDatosPersona();
      } else {
        limpiarFormulario();
      }
    }, [personaVM.PersonaSeleccionada?.ID])
  );

  function esEdicion(): boolean {
    return personaVM.PersonaSeleccionada !== null;
  }

  function cargarDatosPersona(): void {
    const persona = personaVM.PersonaSeleccionada!;
    
    setNombre(persona.Nombre);
    setApellidos(persona.Apellidos);
    setTelefono(persona.Telefono);
    setDireccion(persona.Direccion || "");
    setFoto(persona.Foto || "");
    setFechaNacimiento(formatearFecha(persona.FechaNacimiento));
    setIdDepartamento(persona.IDDepartamento);
  }

  function formatearFecha(fecha: Date | null): string {
    if (!fecha) return "";
    
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  }

  function limpiarFormulario(): void {
    setNombre("");
    setApellidos("");
    setTelefono("");
    setDireccion("");
    setFoto("");
    setFechaNacimiento("");
    setIdDepartamento(0);
  }

  function validarFormulario(): boolean {
    if (!validarCamposObligatorios()) {
      return false;
    }

    if (fechaNacimiento.trim() !== "" && !validarFormatoFecha()) {
      return false;
    }

    return true;
  }

  function validarCamposObligatorios(): boolean {
    const camposCompletos = 
      nombre.trim() !== "" &&
      apellidos.trim() !== "" &&
      telefono.trim() !== "" &&
      idDepartamento > 0;

    if (!camposCompletos) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos obligatorios (Nombre, Apellidos, Teléfono y Departamento)"
      );
      return false;
    }

    return true;
  }

  function validarFormatoFecha(): boolean {
    const formatoCorrecto = /^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento);
    
    if (!formatoCorrecto) {
      Alert.alert("Error", "La fecha debe estar en formato YYYY-MM-DD");
      return false;
    }

    const fecha = new Date(fechaNacimiento);
    
    if (isNaN(fecha.getTime())) {
      Alert.alert("Error", "La fecha proporcionada no es válida");
      return false;
    }

    return true;
  }

  async function handleGuardar(): Promise<void> {
    if (!validarFormulario()) {
      return;
    }

    const persona = construirPersona();

    try {
      if (esEdicion()) {
        await editarPersona(persona);
      } else {
        await crearPersona(persona);
      }
      
      limpiarFormulario();
      router.back();
    } catch (error) {
      mostrarErrorGuardado(error);
    }
  }

  function construirPersona(): Persona {
    const idPersona = esEdicion() ? personaVM.PersonaSeleccionada!.ID : 0;
    const fecha = obtenerFechaValida();

    return new Persona(
      idPersona,
      nombre,
      apellidos,
      telefono,
      idDepartamento,
      direccion || null,
      foto || null,
      fecha
    );
  }

  function obtenerFechaValida(): Date | null {
    if (fechaNacimiento.trim() === "") {
      return null;
    }
    
    return new Date(fechaNacimiento);
  }

  async function editarPersona(persona: Persona): Promise<void> {
    await personaVM.editarPersona(persona.ID, persona);
    Alert.alert("Éxito", "Persona actualizada correctamente");
  }

  async function crearPersona(persona: Persona): Promise<void> {
    await personaVM.crearPersona(persona);
    Alert.alert("Éxito", "Persona creada correctamente");
  }

  function mostrarErrorGuardado(error: unknown): void {
    const mensaje = error instanceof Error ? error.message : "Error desconocido";
    Alert.alert("Error", `No se pudo guardar la persona: ${mensaje}`);
  }

  function obtenerTitulo(): string {
    return esEdicion() ? "Editar Persona" : "Nueva Persona";
  }

  function obtenerTextoBoton(): string {
    return esEdicion() ? "Actualizar" : "Crear";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{obtenerTitulo()}</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingrese el nombre"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellidos *</Text>
          <TextInput
            style={styles.input}
            value={apellidos}
            onChangeText={setApellidos}
            placeholder="Ingrese los apellidos"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Teléfono *</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Ingrese el teléfono"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Ingrese la dirección"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Foto URL</Text>
          <TextInput
            style={styles.input}
            value={foto}
            onChangeText={setFoto}
            placeholder="URL de la foto"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Nacimiento (opcional)</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="YYYY-MM-DD (ej: 1990-01-15)"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departamento *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idDepartamento}
              onValueChange={(itemValue) => setIdDepartamento(Number(itemValue))}
            >
              <Picker.Item label="Seleccione un departamento" value={0} />
              {departamentoVM.DepartamentoList.map((dept) => (
                <Picker.Item key={dept.ID} label={dept.Nombre} value={dept.ID} />
              ))}
            </Picker>
          </View>
        </View>

        <BotonSubmit
          titulo={obtenerTextoBoton()}
          onPress={handleGuardar}
          isLoading={personaVM.isLoading}
        />
      </View>
    </ScrollView>
  );
});

export default EditarInsertarPersonas;

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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});