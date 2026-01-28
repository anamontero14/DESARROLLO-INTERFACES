// src/app/(drawer)/ListadoPersonas.tsx

import React, { JSX, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { container } from "../../../core/container";
import { TYPES } from "../../../core/types";
import { PersonaViewModel } from "../../../presenter/viewmodels/PersonaVM";
import { Elemento } from "../../../components/Elemento";
import { BotonAñadir } from "../../../components/BotonAñadir";
import { PersonaDTO } from "../../../domain/dtos/PersonaDTO";

const ListadoPersonas: React.FC = observer(() => {
  //objeto que hace referencia al viewmodel para poder usar sus métodos
  const personaVM = container.get<PersonaViewModel>(TYPES.PersonaViewModel);
  //objeto router para poder navegar con useRouter
  const router = useRouter();

  //carga inicial: cuando el componente se monta, llama a cargarDatos()
  useEffect(() => {
    cargarDatos();
  }, []);

  //función que carga los datos del viewmodel
  function cargarDatos(): void {
    personaVM.cargarPersonas();
  }

  //convierte el número de edad a texto legible para la UI 
  //asume que Edad es number (no nullable) y que 0 significa "fecha desconocida" 
  function obtenerTextoEdadDTO(persona: PersonaDTO): string { 
    // no mostrar si sentinel (0 o negativo) 
    const edad = persona.Edad; if (!edad || edad <= 0) return ""; 
    return `${edad} año${edad !== 1 ? "s" : ""}`; 
  }

  function confirmarEliminacion(id: number): void {
    //comprueba que la plataforma sea web
    if (Platform.OS == 'web') {
      //si es web le salta al usuario una alerta de confirmación
      if (window.confirm("¿Seguro que deseas eliminar a la persona?")) {
        //si confirma se llama al método de eliminar una persona con el id
        eliminarPersona(id);
      }
      //si no es web
    } else {
      //se llama a la confirmación que funciona en el móvil
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que deseas eliminar esta persona?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            style: "destructive",
            //si le da a que sí llama al método de eliminar una persona
            onPress: () => eliminarPersona(id),
          },
        ]
      );
    }
  }

  //función asíncrona que elimina una persona
  async function eliminarPersona(id: number): Promise<void> {
    try {
      //constante que almacena el mensaje de éxito
      const mensaje = "Persona eliminada correctamente";
      //se llama al método de eliminar una persona
      await personaVM.eliminarPersona(id);
      //comprueba si la plataforma es web
      if (Platform.OS === 'web') {
        //manda otra alerta con el mensaje de éxito
        alert(mensaje);
        //si no es web
      } else {
        //manda un mensaje de éxito
        Alert.alert("Éxito", mensaje);
      }
      //si hay un errror
    } catch (error) {
      //constante que guarda el mensaje de error
      const mensaje = error instanceof Error ? error.message : "Error desconocido";
      //comprueba otra vez la plataforma
      if (Platform.OS === 'web') {
        //alerta el mensaje
        alert(`Error: ${mensaje}`);
      } else {
        //alerta en móvil
        Alert.alert("Error", mensaje);
      }
    }
  }

  //función que sirve para navegar a la pantalla de editar
  //seleccionada del viewmodel a la persona que se ha seleccionado en la vista
  function navegarAEdicion(persona: PersonaDTO): void {
    //se iguala la persona del viewmodel a la actual
    personaVM.PersonaSeleccionada = persona;
    //se navega hasta la vista de editar
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  //función para poder navegar a la vista de crear una nueva persona
  function navegarACreacion(): void {
    //se pone la persona seleccionada a null
    personaVM.PersonaSeleccionada = null;
    //se navega a la pantalla de insertar personas
    router.push("/(drawer)/personas/EditarInsertarPersonas");
  }

  function renderizarPersona({ item }: { item: PersonaDTO }): JSX.Element {
    //obtiene el texto de la edad
    const textoEdad = obtenerTextoEdadDTO(item);
    //devuelve el componente de elemento
    return (
      <Elemento
        titulo={`${item.Nombre} ${item.Apellidos}`}
        subtitulo={item.Telefono}
        subtitulo2={textoEdad}
        fotoUrl={item.Foto || undefined}
        onPress={() => navegarAEdicion(item)}
        onDelete={() => confirmarEliminacion(item.ID)}
      />
    );
  }

  //función para renderizar contenido
  function renderizarContenido(): JSX.Element {
    //si el circulito está cargando...
    if (personaVM.isLoading) {
      // devuelve la función de renderizar cargando
      return renderizarCargando();
    }
    
    if (personaVM.PersonaList.length === 0) {
      return renderizarListaVacia();
    }
    
    return renderizarLista(personaVM.PersonaList);
  }

  //renderiza el cargando
  function renderizarCargando(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  //renderiza la vista
  function renderizarListaVacia(): JSX.Element {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No hay personas para mostrar</Text>
      </View>
    );
  }

  //renderiza la lista
  function renderizarLista(personas: Persona[]): JSX.Element {
    return (
      <FlatList
        data={personas}
        renderItem={renderizarPersona}
        keyExtractor={(item) => item.ID.toString()}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Personas</Text>
        <Text style={styles.headerSubtitle}>
          {personaVM.PersonaList.length} {personaVM.PersonaList.length === 1 ? 'persona' : 'personas'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <BotonAñadir onPress={navegarACreacion} titulo="➕ Añadir Persona" />
      </View>

      {renderizarContenido()}
    </View>
  );
});

export default ListadoPersonas;

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