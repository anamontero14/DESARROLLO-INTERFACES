// src/app/(drawer)/EditarInsertarPersonas.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Image } from "react-native";
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

    if (!validarFormatoFecha()) {
      return false;
    }

    return true;
  }

  function validarCamposObligatorios(): boolean {
    const camposCompletos = 
      nombre.trim() !== "" &&
      apellidos.trim() !== "" &&
      telefono.trim() !== "" &&
      fechaNacimiento.trim() !== "" &&
      idDepartamento > 0;

    if (!camposCompletos) {
      Alert.alert(
        "Error",
        "Por favor completa todos los campos obligatorios (Nombre, Apellidos, Teléfono, Fecha de Nacimiento y Departamento)"
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

    const hoy = new Date();
    if (fecha > hoy) {
      Alert.alert("Error", "La fecha de nacimiento no puede ser futura");
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
      router.push("/(drawer)/personas/ListadoPersonas");
    } catch (error) {
      mostrarErrorGuardado(error);
    }
  }

  function construirPersona(): Persona {
    const idPersona = esEdicion() ? personaVM.PersonaSeleccionada!.ID : 0;
    const fecha = new Date(fechaNacimiento);

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
    return esEdicion() ? "💾 Actualizar" : "➕ Crear";
  }

  function renderVistaPrevia(): JSX.Element | null {
    if (!foto) return null;

    return (
      <View style={styles.vistaPrevia}>
        <Text style={styles.vistaPreviaLabel}>Vista previa:</Text>
        <Image 
          source={{ uri: foto }} 
          style={styles.imagenPrevia}
          onError={() => Alert.alert("Error", "No se pudo cargar la imagen")}
        />
      </View>
    );
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
          <Text style={styles.sectionTitle}>📋 Información Personal</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre *</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ingrese el nombre"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Apellidos *</Text>
            <TextInput
              style={styles.input}
              value={apellidos}
              onChangeText={setApellidos}
              placeholder="Ingrese los apellidos"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Fecha de Nacimiento *</Text>
            <TextInput
              style={styles.input}
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
              placeholder="YYYY-MM-DD (ej: 1990-01-15)"
              placeholderTextColor="#999"
            />
            <Text style={styles.helpText}>
              Formato: Año-Mes-Día (ejemplo: 1990-01-15)
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contacto</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Ingrese el teléfono"
              placeholderTextColor="#999"
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
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏢 Organización</Text>
          
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📷 Foto de Perfil</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>URL de la Foto</Text>
            <TextInput
              style={styles.input}
              value={foto}
              onChangeText={setFoto}
              placeholder="https://ejemplo.com/foto.jpg"
              placeholderTextColor="#999"
            />
            <Text style={styles.helpText}>
              Ingrese la URL de una imagen (opcional)
            </Text>
          </View>

          {renderVistaPrevia()}
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
    marginBottom: 20,
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
  pickerContainer: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  vistaPrevia: {
    alignItems: "center",
    marginTop: 15,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  vistaPreviaLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  imagenPrevia: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
});