import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
// Importamos la Entidad desde Domain
import { Persona } from "../../domain/entities/Persona";
// Importamos el ViewModel desde Presentation
import { PeopleListVM } from "../viewmodels/PeopleListVM";


// La Vista obtiene el ViewModel a través del contenedor (DI) y lo usa.
export default function PeopleListV() {

    // Cambiamos a PeopleListV para reflejar el nombre del archivo en la estructura
    const viewModel = container.get<PeopleListVM>(TYPES.IndexVM); 

    const renderItem = ({ item }: { item: Persona }) => (
        <Text style={styles.itemText}>{item.nombre} {item.apellido}</Text>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Listado de Personas</Text>

            <FlatList
                data={viewModel.personasList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={() => (
                    <Text style={styles.textoVacio}>No hay personas registradas</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    titulo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    item: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    itemPresionado: {
        backgroundColor: "#D0E8FF",
    },
    itemText: {
        fontSize: 16,
    },
    separator: {
        height: 10,
    },
    input: {
        width: "80%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    textoVacio: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#888",
    },
});