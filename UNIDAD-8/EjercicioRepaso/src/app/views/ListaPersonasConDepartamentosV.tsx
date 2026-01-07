// src/app/views/ListaPersonasConDepartamentosV.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
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
    
    const [modalVisible, setModalVisible] = useState(false);
    const [personaSeleccionadaIndex, setPersonaSeleccionadaIndex] = useState<number | null>(null);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    const cargarDatosIniciales = async (): Promise<void> => {
        await viewModel.cargarPersonasConDepartamentos();
    };

    const handleComprobar = async (): Promise<void> => {
        const todasSeleccionadas = validarTodasSeleccionadas();
        
        if (!todasSeleccionadas) {
            alert('Debes seleccionar un departamento para todas las personas antes de comprobar.');
            return;
        }

        await viewModel.comprobarRespuestas();
        setMostrarResultados(true);
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

    const handleReiniciar = (): void => {
        viewModel.reiniciarJuego();
        setMostrarResultados(false);
    };

    const abrirSelector = (index: number): void => {
        setPersonaSeleccionadaIndex(index);
        setModalVisible(true);
    };

    const seleccionarDepartamento = (idDepartamento: number): void => {
        if (personaSeleccionadaIndex !== null) {
            viewModel.actualizarSeleccionDepartamento(personaSeleccionadaIndex, idDepartamento);
        }
        setModalVisible(false);
        setPersonaSeleccionadaIndex(null);
    };

    const obtenerNombreDepartamento = (idDepartamento: number, listaDepartamentos: any[]): string => {
        if (idDepartamento === 0) {
            return "Selecciona un departamento...";
        }
        const departamento = listaDepartamentos.find(d => d.id === idDepartamento);
        return departamento ? departamento.nombre : "Selecciona un departamento...";
    };

    const renderPersonaItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={[styles.personaItem, { backgroundColor: item.color }]}>
                <View style={styles.personaInfo}>
                    <Text style={styles.personaNombre}>
                        {item.nombrePersona} {item.apellidosPersona}
                    </Text>
                </View>
                
                <TouchableOpacity 
                    style={styles.selectorContainer}
                    onPress={() => abrirSelector(index)}
                >
                    <Text style={[
                        styles.selectorText,
                        item.idDepartamentoGuess === 0 && styles.selectorPlaceholder
                    ]}>
                        {obtenerNombreDepartamento(item.idDepartamentoGuess, item.listadoDepartamentos)}
                    </Text>
                    <Text style={styles.selectorArrow}>▼</Text>
                </TouchableOpacity>
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

    const personaActual = personaSeleccionadaIndex !== null 
        ? viewModel.personasConDepartamentosList[personaSeleccionadaIndex] 
        : null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🎯 Adivina los Departamentos</Text>
                <Text style={styles.subtitle}>
                    Las personas del mismo departamento tienen el mismo color
                </Text>
            </View>

            {/* Mostrar resultados si ya se comprobó */}
            {mostrarResultados && viewModel.aciertos !== null && (
                <View style={[
                    styles.resultadoContainer,
                    viewModel.hasGanado ? styles.resultadoGanado : styles.resultadoIntento
                ]}>
                    <Text style={styles.resultadoEmoji}>
                        {viewModel.hasGanado ? '🎉' : '📊'}
                    </Text>
                    <Text style={styles.resultadoTitulo}>
                        {viewModel.hasGanado ? '¡Enhorabuena!' : 'Resultado'}
                    </Text>
                    <Text style={styles.resultadoTexto}>
                        {viewModel.hasGanado 
                            ? '¡Has acertado todos los departamentos! ¡Eres un experto!'
                            : `Has acertado ${viewModel.aciertos} de ${viewModel.personasConDepartamentosList.length} departamentos. ¡Sigue intentándolo!`
                        }
                    </Text>
                </View>
            )}

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

            {/* Modal para seleccionar departamento */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Selecciona un departamento</Text>
                            <TouchableOpacity 
                                onPress={() => setModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <ScrollView style={styles.modalScrollView}>
                            {personaActual?.listadoDepartamentos.map((dept: any) => (
                                <TouchableOpacity
                                    key={dept.id}
                                    style={[
                                        styles.departamentoOption,
                                        personaActual.idDepartamentoGuess === dept.id && styles.departamentoOptionSelected
                                    ]}
                                    onPress={() => seleccionarDepartamento(dept.id)}
                                >
                                    <Text style={[
                                        styles.departamentoOptionText,
                                        personaActual.idDepartamentoGuess === dept.id && styles.departamentoOptionTextSelected
                                    ]}>
                                        {dept.nombre}
                                    </Text>
                                    {personaActual.idDepartamentoGuess === dept.id && (
                                        <Text style={styles.checkMark}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    resultadoContainer: {
        margin: 16,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resultadoGanado: {
        backgroundColor: '#D4EDDA',
        borderWidth: 2,
        borderColor: '#28A745',
    },
    resultadoIntento: {
        backgroundColor: '#FFF3CD',
        borderWidth: 2,
        borderColor: '#FFC107',
    },
    resultadoEmoji: {
        fontSize: 48,
        marginBottom: 8,
    },
    resultadoTitulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    resultadoTexto: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
    selectorContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectorText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    selectorPlaceholder: {
        color: '#999',
    },
    selectorArrow: {
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
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
    // Estilos del Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 4,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
    },
    modalScrollView: {
        maxHeight: 400,
    },
    departamentoOption: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    departamentoOptionSelected: {
        backgroundColor: '#E5F5FF',
    },
    departamentoOptionText: {
        fontSize: 16,
        color: '#333',
    },
    departamentoOptionTextSelected: {
        color: '#007AFF',
        fontWeight: '600',
    },
    checkMark: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default ListaPersonasConDepartamentosV;