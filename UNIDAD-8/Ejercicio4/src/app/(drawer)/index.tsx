import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BotonNavegar } from '../../components/BotonNavegar';
import { CajónBotones } from '../../components/CajónBotones';

export default function PantallaBienvenida() {
  return (
    <View style={styles.container}>

      <CajónBotones>
        <BotonNavegar titulo="Gestionar Personas" ruta="/personas/ListadoPersonas" />
        <BotonNavegar titulo="Gestionar Departamentos" ruta="/departamentos/ListadoDepartamentos"/>
      </CajónBotones>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});