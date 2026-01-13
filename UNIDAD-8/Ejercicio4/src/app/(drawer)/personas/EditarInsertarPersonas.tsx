// src/app/(drawer)/EditarInsertarPersonas.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { PersonaViewModel } from "../../../presenter/viewmodels/PersonaVM";
import { DepartamentoViewModel } from "../../../presenter/viewmodels/DepartamentoVM";
import { Persona } from "../../../domain/entities/Persona";
import { BotonSubmit } from "../../../components/BotonSubmit";
import { Picker } from "@react-native-picker/picker";

const EditarInsertarPersonas: React.FC = observer(() => {
  const personaVM = container.get<PersonaViewModel>(TYPES.PersonaViewModel);
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  const router = useRouter();
  const personaSeleccionada = personaVM.PersonaSeleccionada;
  const esEdicion = personaSeleccionada !== null;

  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [idDepartamento, setIdDepartamento] = useState<number>(0);

  useEffect(() => {
    cargarDepartamentos();
    cargarDatosPersona();
  }, []);

  function cargarDepartamentos(): void {
    departamentoVM.cargarDepartamentos();
  }

  function cargarDatosPersona(): void {
    if (personaSeleccionada) {
      setNombre(personaSeleccionada.Nombre);
      setApellidos(personaSeleccionada.Apellidos);
      setTelefono(personaSeleccionada.Telefono);
      setDireccion(personaSeleccionada.Direccion);
      setFoto(personaSeleccionada.Foto);
      setFechaNacimiento(formatearFecha(personaSeleccionada.FechaNacimiento));
      setIdDepartamento(personaSeleccionada.IDDepartamento);
    }
  }

  function formatearFecha(fecha: Date): string {
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function validarFormulario(): boolean {
    let esValido = false;
    const hayNombre = nombre.trim() !== "";
    const hayApellidos = apellidos.trim() !== "";
    const hayTelefono = telefono.trim() !== "";
    const hayDepartamento = idDepartamento > 0;

    if (!hayNombre || !hayApellidos || !hayTelefono || !hayDepartamento) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
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

    const fecha = fechaNacimiento ? new Date(fechaNacimiento) : new Date();
    const idPersona = personaSeleccionada ? personaSeleccionada.ID : 0;

    const persona = new Persona(
      idPersona,
      nombre,
      apellidos,
      telefono,
      direccion,
      foto,
      fecha,
      idDepartamento
    );

    try {
      if (esEdicion) {
        await personaVM.editarPersona(idPersona, persona);
        Alert.alert("Éxito", "Persona actualizada correctamente");
      } else {
        await personaVM.crearPersona(persona);
        Alert.alert("Éxito", "Persona creada correctamente");
      }
      router.back();
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      Alert.alert("Error", mensaje);
    }
  }

  const titulo = esEdicion ? "Editar Persona" : "Nueva Persona";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{titulo}</Text>

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
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departamento *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={idDepartamento}
              onValueChange={(itemValue: React.SetStateAction<number>) => setIdDepartamento(itemValue)}
            >
              <Picker.Item label="Seleccione un departamento" value={0} />
              {departamentoVM.DepartamentoList.map((dept: { ID: any; Nombre: any; }) => (
                <Picker.Item key={dept.ID} label={dept.Nombre} value={dept.ID} />
              ))}
            </Picker>
          </View>
        </View>

        <BotonSubmit
          titulo={esEdicion ? "Actualizar" : "Crear"}
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