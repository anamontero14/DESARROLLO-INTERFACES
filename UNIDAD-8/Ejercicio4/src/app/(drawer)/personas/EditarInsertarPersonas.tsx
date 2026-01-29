// src/app/(drawer)/EditarInsertarPersonas.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, Image, Platform } from "react-native";
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
  //constante que servirá para obtener los métodos del viewmodel
  const personaVM = container.get<PersonaViewModel>(TYPES.PersonaViewModel);
  //constante que servirá para poder mostrar una lista de los departamentos a la
  //hora de crear o editar una persona
  const departamentoVM = container.get<DepartamentoViewModel>(TYPES.DepartamentoViewModel);
  //constante que nos sirve para poder usar métodos para movernos entre pantallas
  const router = useRouter();

  //atributos que hacen una persona
  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [foto, setFoto] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [idDepartamento, setIdDepartamento] = useState<number>(0);

  //carga los datos de los departamentos
  useEffect(() => {
    departamentoVM.cargarDepartamentos();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      //a una constante se le iguala un booleano comprobando si la persona seleccionada
      //es null o no, si es null significa que hay que crear una persona y si
      //NO es null significa que estamos en la vista de editar
      const esEdicion = personaVM.PersonaSeleccionada !== null;
      
      //si es true signigica que estamos en edicion
      if (esEdicion) {
        //la constante persona se iguala a la que se obtiene del viewmodel
        //indicándole que NO es null
        const persona = personaVM.PersonaSeleccionada!;
        //constante que almacena la cadena de la fecha formateada
        const fechaFormateada = formatearFecha(persona.FechaNacimiento);
        //se settean los atributos de la persona a los de la persona seleccionada
        setNombre(persona.Nombre);
        setApellidos(persona.Apellidos);
        setTelefono(persona.Telefono);
        setDireccion(persona.Direccion || "");
        setFoto(persona.Foto || "");
        setFechaNacimiento(fechaFormateada);
        setIdDepartamento(persona.IDDepartamento);
      } else {
        //si no estamos en la lista de editar entonces se está creando
        //una nueva persona entonces iguala todos los campos a vacíos
        setNombre("");
        setApellidos("");
        setTelefono("");
        setDireccion("");
        setFoto("");
        setFechaNacimiento("");
        setIdDepartamento(0);
      }
    }, [personaVM.PersonaSeleccionada?.ID])
  );

  //función que se encarga de formatear la fecha para que sea
  //visible como un string
  function formatearFecha(fecha: Date | null): string {
    let resultado = "";
    
    if (fecha) {
      const d = new Date(fecha);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      resultado = `${year}-${month}-${day}`;
    }
    
    return resultado;
  }

  //función que se encarga de comprobar que el formulario esté
  //bien formado y con todos los campos obligatorios rellenos
  function validarFormulario(): boolean {
    //utiliza una variable auxiliar para comprobar que los campos son válidos
    let esValido = false;
    
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
      return esValido;
    }

    const formatoCorrecto = /^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento);
    
    if (!formatoCorrecto) {
      Alert.alert("Error", "La fecha debe estar en formato YYYY-MM-DD");
      return esValido;
    }

    const fecha = new Date(fechaNacimiento);
    const fechaInvalida = isNaN(fecha.getTime());
    
    if (fechaInvalida) {
      Alert.alert("Error", "La fecha proporcionada no es válida");
      return esValido;
    }

    const hoy = new Date();
    const fechaFutura = fecha > hoy;
    
    if (fechaFutura) {
      Alert.alert("Error", "La fecha de nacimiento no puede ser futura");
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
    //se almacena en la constante si hay una persona seleccionada o no
    //comprobando así si estamos en la edición de personas o no
    const esEdicion = personaVM.PersonaSeleccionada !== null;
    //si edición es true usa el id de la persona seleccionada, si no usa 0
    const idPersona = esEdicion ? personaVM.PersonaSeleccionada!.ID : 0;
    //la constante fecha almacena la fecha de nacimiento y ya
    const fecha = new Date(fechaNacimiento);
    //se crea una nueva persona
    const persona = new Persona(
      idPersona,
      nombre,
      apellidos,
      telefono,
      idDepartamento,
      direccion || null,
      foto || null,
      fecha
    );

    try {
      //dependiendo de en qué vista estemos se manda un mensaje u otro
      const mensajeExito = esEdicion ? "Persona actualizada correctamente" : "Persona creada correctamente";
      //si estamos en la vista de edición
      if (esEdicion) {
        //se edita a la persona mediante el método del viewmodel que pide su id y el objeto de la persona
        await personaVM.editarPersona(persona.ID, persona);
      } else {
        //si no crea una persona
        await personaVM.crearPersona(persona);
      }

      //dependiendo de la plataforma en la que esté utiliza una alerta u otra
      if (Platform.OS == "web") {
        alert("Éxito" + mensajeExito)
      } else {
        //comprobar la plataforma en la que se encuentra
        Alert.alert("Éxito", mensajeExito);
      }
      
      //se vuelven a inicializar todos los campos a vacíos
      setNombre("");
      setApellidos("");
      setTelefono("");
      setDireccion("");
      setFoto("");
      setFechaNacimiento("");
      setIdDepartamento(0);
      //se vuelve a la vista del listado de personas
      router.push("/(drawer)/personas/ListadoPersonas");
    } catch (error) {
      //constante que almacena el mensaje de error
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      //dependiendo de la plataforma se manda un tipo de alerta u otro
      if (Platform.OS == "web") {
        alert("Éxito" + mensaje)
      } else {
        Alert.alert("Error", `No se pudo guardar la persona: ${mensaje}`);
      }
    }
  }
  
  //se almacena true o false dependiendo de si la persona es null o no
  const esEdicion = personaVM.PersonaSeleccionada !== null;
  //dependiendo tmb de si edición es true o false el titulo será uno u otro
  const titulo = esEdicion ? "Editar Persona" : "Nueva Persona";
  const textoBoton = esEdicion ? "💾 Actualizar" : "➕ Crear";
  const mostrarVistaPrevia = foto !== "";

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

          {mostrarVistaPrevia && (
            <View style={styles.vistaPrevia}>
              <Text style={styles.vistaPreviaLabel}>Vista previa:</Text>
              <Image 
                source={{ uri: foto }} 
                style={styles.imagenPrevia}
                onError={() => Alert.alert("Error", "No se pudo cargar la imagen")}
              />
            </View>
          )}
        </View>

        <BotonSubmit
          titulo={textoBoton}
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