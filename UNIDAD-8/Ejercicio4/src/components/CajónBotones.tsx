// src/components/CajónBotones.tsx

import React from "react";
import { View, StyleSheet } from "react-native";

interface CajónBotonesProps {
  children: React.ReactNode;
}

export const CajónBotones: React.FC<CajónBotonesProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
});