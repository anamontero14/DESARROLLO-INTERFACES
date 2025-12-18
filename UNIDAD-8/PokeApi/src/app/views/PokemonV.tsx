import { observer } from "mobx-react-lite";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { PokemonVM } from "../../presenter/viewmodels/PokemonVM";
import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export const PokemonV = observer(() => {
    const [viewModel] = useState(() => container.get<PokemonVM>(TYPES.PokemonVM));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Pokémon</Text>
            
            <TouchableOpacity 
                style={viewModel.isLoading ? styles.buttonDisabled : styles.button}
                onPress={() => viewModel.cargarSiguiente()}
                disabled={viewModel.isLoading}
            >
                <Text style={styles.buttonText}>
                    {viewModel.isLoading ? "Cargando..." : "Cargar 20 Pokémon"}
                </Text>
            </TouchableOpacity>

            {viewModel.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

            <FlatList
                data={viewModel.pokemonList}
                keyExtractor={(index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.pokemonItem}>
                        <Text style={styles.pokemonName}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pokemonItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    pokemonName: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
});