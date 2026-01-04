// src/app/views/ListaPersonasConDepartamentosV.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Picker } from '@react-native-picker/picker';
import { container } from '../../core/container';
import { TYPES } from '../../core/types';
import { EjercicioRepasoVM } from '../../presenter/viewmodels/EjercicioRepasoVM';

/**
 * Vista principal del juego de adivinar departamentos
 */
const ListaPersonasConDepartamentosV = observer(() => {
    const [viewModel] = useState<EjercicioRepasoVM>(() => 
        container.get<EjercicioRepasoVM>(TYPES.EjercicioRepasoVM)
    );

    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    const cargarDatosIniciales = async (): Promise<void> => {
        await viewModel.cargarPersonasConDepartamentos();
    };

    const handleComprobar = async (): Promise<void> => {
        const todasSeleccionadas = validarTodasSeleccionadas();
        
        if (!todasSeleccionadas) {
            Alert.alert(
                'Advertencia',
                'Debes seleccionar un departamento para todas las personas antes de comprobar.'
            );
            return;
        }

        await viewModel.comprobarRespuestas();
        mostrarResultado();
    };

    const validarTodasSeleccionadas = (): boolean => {
        let resultado = true;
        
        for (const persona of viewModel.personasConDepartamentosList) {
            if (persona.idDepartamentoGuess === 0) {
                resultado = false;
            }
        }
        
        return resultado;
    };

    const mostrarResultado = (): void => {
        if (viewModel.hasGanado) {
            Alert.alert(
                '¡Enhorabuena! 🎉',
                '¡Has acertado todos los departamentos! ¡Eres un experto!',
                [{ text: 'Jugar de nuevo', onPress: handleReiniciar }]
            );
            return;
        }

        Alert.alert(
            'Resultado',
            `Has acertado ${viewModel.aciertos} de ${viewModel.personasConDepartamentosList.length} departamentos. ¡Sigue intentándolo!`
        );
    };

    const handleReiniciar = (): void => {
        viewModel.reiniciarJuego();
    };

    const renderPersonaItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={[styles.personaItem, { backgroundColor: item.color }]}>
                <View style={styles.personaInfo}>
                    <Text style={styles.personaNombre}>
                        {item.nombrePersona} {item.apellidosPersona}
                    </Text>
                </View>
                
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={item.idDepartamentoGuess}
                        style={styles.picker}
                        onValueChange={(value) => viewModel.actualizarSeleccionDepartamento(index, value)}
                    >
                        <Picker.Item label="Selecciona un departamento..." value={0} />
                        {item.listadoDepartamentos.map((dept: any) => (
                            <Picker.Item 
                                key={dept.id} 
                                label={dept.nombre} 
                                value={dept.id} 
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        );
    };

    if (viewModel.isLoading && viewModel.personasConDepartamentosList.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando personas...</Text>
            </View>
        );
    }

    if (viewModel.error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Error: {viewModel.error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={cargarDatosIniciales}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🎯 Adivina los Departamentos</Text>
                <Text style={styles.subtitle}>
                    Las personas del mismo departamento tienen el mismo color
                </Text>
            </View>

            <FlatList
                data={viewModel.personasConDepartamentosList}
                renderItem={renderPersonaItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.comprobarButton} 
                    onPress={handleComprobar}
                    disabled={viewModel.isLoading}
                >
                    {viewModel.isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Comprobar</Text>
                    )}
                </TouchableOpacity>

                {viewModel.aciertos !== null && (
                    <TouchableOpacity 
                        style={styles.reiniciarButton} 
                        onPress={handleReiniciar}
                    >
                        <Text style={styles.buttonText}>Reiniciar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: '#007AFF',
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    listContainer: {
        padding: 16,
    },
    personaItem: {
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    personaInfo: {
        marginBottom: 12,
    },
    personaNombre: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    pickerContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    picker: {
        height: 50,
    },
    buttonContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    comprobarButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    reiniciarButton: {
        backgroundColor: '#FF9500',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        paddingHorizontal: 24,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ListaPersonasConDepartamentosV;