// src/components/BotonSubmit.tsx

import React, { JSX } from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

interface BotonSubmitProps {
  titulo: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const BotonSubmit: React.FC<BotonSubmitProps> = ({ 
  titulo, 
  onPress, 
  disabled = false,
  isLoading = false 
}) => {
  function manejarPresion(): void {
    if (puedeEjecutarAccion()) {
      onPress();
    }
  }

  function puedeEjecutarAccion(): boolean {
    return !disabled && !isLoading;
  }

  function estaDeshabilitado(): boolean {
    return disabled || isLoading;
  }

  function obtenerEstiloBoton(): any[] {
    if (disabled) {
      return [styles.button, styles.buttonDisabled];
    }
    return [styles.button];
  }

  function renderizarContenido(): JSX.Element {
    if (isLoading) {
      return <ActivityIndicator color="#fff" />;
    }
    
    return <Text style={styles.buttonText}>{titulo}</Text>;
  }

  return (
    <TouchableOpacity 
      style={obtenerEstiloBoton()} 
      onPress={manejarPresion}
      disabled={estaDeshabilitado()}
    >
      {renderizarContenido()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34C759",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});