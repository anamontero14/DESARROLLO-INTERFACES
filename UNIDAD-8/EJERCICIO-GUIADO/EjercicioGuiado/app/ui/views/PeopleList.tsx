import React, { useCallback, useRef, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";
import { observer } from "mobx-react-lite";

const viewModel = container.get<PeopleListVM>(TYPES.IndexVM);
const { width, height } = Dimensions.get("window");

// Generador de colores ofensivos a la vista
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// --- 1. Componente de Texto con "Jitter" (Tembleque) ---
const JitterText = ({ text, style }: { text: string, style?: any }) => {
  const jitterX = useRef(new Animated.Value(0)).current;
  const jitterY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sequence = Animated.sequence([
      Animated.timing(jitterX, { toValue: Math.random() * 4 - 2, duration: 50, useNativeDriver: true }),
      Animated.timing(jitterY, { toValue: Math.random() * 4 - 2, duration: 50, useNativeDriver: true }),
      Animated.timing(jitterX, { toValue: 0, duration: 50, useNativeDriver: true }),
      Animated.timing(jitterY, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]);
    Animated.loop(sequence).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ translateX: jitterX }, { translateY: jitterY }] }}>
      <Text style={style}>{text}</Text>
    </Animated.View>
  );
};

// --- 2. Fondo Hipnótico Giratorio ---
const HypnoticCircle = ({ size, direction = 1, speed = 3000 }: any) => {
    const spin = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        Animated.loop(
            Animated.timing(spin, {
                toValue: 1,
                duration: speed,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, []);

    const rotate = spin.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', `${360 * direction}deg`]
    });

    return (
        <Animated.View style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: size / 2,
            borderWidth: 10,
            borderColor: getRandomColor(),
            borderStyle: 'dashed',
            opacity: 0.3,
            top: (height/2) - (size/2),
            left: (width/2) - (size/2),
            transform: [{ rotate }]
        }} />
    );
};

// --- 3. Ítem "Basura Espacial" ---
const TrashItem = ({ item, index, onPress, isSelected }: any) => {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Entra desde 0
  
  useEffect(() => {
      Animated.spring(scaleAnim, { toValue: 1, tension: 20, friction: 1, useNativeDriver: true }).start();
  }, []);

  // Estilo totalmente aleatorio para cada ítem
  const rotation = Math.random() * 20 - 10 + 'deg'; // Rotación aleatoria entre -10 y 10
  const randomMargin = Math.random() * 30; 
  const bg = isSelected ? '#FFFFFF' : '#000000';
  const txtColor = isSelected ? '#000000' : getRandomColor();

  return (
    <Animated.View style={{ 
        transform: [{ scale: scaleAnim }, { rotate: rotation }],
        marginLeft: index % 2 === 0 ? 0 : randomMargin, // Layout roto
    }}>
      <Pressable 
        onPress={onPress}
        style={{
            backgroundColor: bg,
            borderWidth: 5,
            borderColor: getRandomColor(),
            padding: 20,
            marginBottom: 30,
            shadowColor: txtColor,
            shadowOffset: { width: 10, height: 10 },
            shadowOpacity: 1,
            shadowRadius: 0, // Sombra dura
            elevation: 10,
        }}
      >
        {isSelected && <Text style={{position: 'absolute', top: -20, left: 0, fontSize: 40}}>💀🔥👁️</Text>}
        
        {/* Renderizado de nombre letra por letra con tamaños locos */}
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {item.nombre.split('').map((char: string, i: number) => (
                 <Text key={i} style={{
                     fontSize: 20 + (Math.random() * 30), // Tamaño aleatorio por letra
                     fontWeight: '900',
                     color: txtColor,
                     fontFamily: Math.random() > 0.5 ? 'monospace' : 'serif'
                 }}>{char}</Text>
            ))}
        </View>

        <JitterText 
            text={item.apellido.toUpperCase()} 
            style={{ 
                color: isSelected ? 'red' : 'white', 
                fontSize: 30, 
                backgroundColor: isSelected ? 'yellow' : 'blue',
                alignSelf: 'flex-start',
                paddingHorizontal: 5
            }} 
        />
      </Pressable>
    </Animated.View>
  );
};

// --- Componente Principal ---
const PeopleList = observer(() => {
    // Estado para "Flash" de pantalla al seleccionar
    const [flash, setFlash] = useState(false);

    const handlePress = (item: Persona) => {
        viewModel.personaSeleccionada = item;
        setFlash(true);
        setTimeout(() => setFlash(false), 100); // 100ms de flash blanco
    };

  const renderItem = useCallback(({ item, index }: { item: Persona, index: number }) => {
    const isSelected = viewModel.personaSeleccionada?.id === item.id;
    return (
      <TrashItem
        item={item}
        index={index}
        onPress={() => handlePress(item)}
        isSelected={isSelected}
      />
    );
  }, [viewModel.personaSeleccionada?.id]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Fondo Caótico */}
      <View style={styles.bgContainer}>
          <HypnoticCircle size={width * 1.5} direction={1} speed={10000} />
          <HypnoticCircle size={width * 1.2} direction={-1} speed={8000} />
          <HypnoticCircle size={width * 0.8} direction={1} speed={5000} />
          <HypnoticCircle size={width * 0.4} direction={-1} speed={2000} />
      </View>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <JitterText text="⚠️ SYSTEM FAILURE ⚠️" style={styles.warningText} />
            <Text style={styles.subHeader}>LISTADO_CORRUPTO.EXE</Text>
        </View>

        {viewModel.personaSeleccionada && (
            <View style={styles.glitchBox}>
                <Text style={styles.glitchText}>
                    SELECCIONADO: {viewModel.personaSeleccionada.nombre}
                </Text>
            </View>
        )}

        <FlatList
            data={viewModel.personasList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>

      {/* Capa de Flash para ataques epilépticos simulados (el flash real) */}
      {flash && <View style={styles.flashOverlay} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#110022",
  },
  bgContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#220000', // Rojo muy oscuro
      overflow: 'hidden',
  },
  header: {
      padding: 20,
      backgroundColor: 'yellow',
      transform: [{ rotate: '-3deg' }],
      borderWidth: 5,
      borderColor: 'black',
      margin: 10,
      zIndex: 100,
  },
  warningText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
  },
  subHeader: {
      fontSize: 12,
      fontFamily: 'monospace',
      textAlign: 'right',
      color: 'red',
  },
  listContent: {
    padding: 20,
    paddingTop: 50,
  },
  glitchBox: {
      backgroundColor: '#00FF00', // Verde matrix
      padding: 10,
      marginHorizontal: 20,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#FFF',
      transform: [{ skewX: '-20deg' }],
  },
  glitchText: {
      fontFamily: 'monospace',
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
  },
  flashOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'white',
      zIndex: 9999,
  }
});

export default PeopleList;