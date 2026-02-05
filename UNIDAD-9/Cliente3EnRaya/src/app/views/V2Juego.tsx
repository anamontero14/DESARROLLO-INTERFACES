import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from "react-native";
import { useRouter } from "expo-router";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { VMJuego } from "../../presenter/viewmodels/VMJuego";

export default function V2Juego() {
  const router = useRouter();
  
  const [estadoPartida, setEstadoPartida] = useState<string>("esperando");
  const [mensaje, setMensaje] = useState<string>("Esperando oponente...");
  const [tablero, setTablero] = useState<string[][]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ]);
  const [esMiTurno, setEsMiTurno] = useState<boolean>(false);

  const [viewModel] = useState(() => {
    const vm = container.get<VMJuego>(TYPES.VMJuego);
    vm.configure(setEstadoPartida, setMensaje, setTablero, setEsMiTurno);
    return vm;
  });

  useEffect(() => {
    initializeGame();
    setupEventListeners();
  }, []);

  const initializeGame = () => {
    viewModel.initialize().catch((error) => {
      console.log("Error de conexión:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor");
    });
  };

  const setupEventListeners = () => {
    const dataSource = container.get<any>(TYPES.JuegoDataSource);
    
    dataSource.on("AsignarSimbolo", handleAsignarSimbolo);
    dataSource.on("IniciarPartida", handleIniciarPartida);
    viewModel.useCase.recibirJugada((jugada) => {
      viewModel.colocarJugada(jugada);
    });
  };

  const handleAsignarSimbolo = (simbolo: string) => {
    console.log("🎯 Símbolo asignado:", simbolo);
    viewModel.miSimbolo = simbolo;
    setMensaje(`Esperando oponente... Eres ${simbolo}`);
  };

  const handleIniciarPartida = () => {
    console.log("🎮 Partida iniciada!");
    setEstadoPartida("jugando");
    
    const esJugadorX = viewModel.miSimbolo === "X";
    const turnoInicial = esJugadorX;
    const mensajeInicial = esJugadorX 
      ? "Tu turno - Eres X" 
      : "Turno del oponente - Eres O";
    
    setEsMiTurno(turnoInicial);
    setMensaje(mensajeInicial);
  };

  const handlePressCasilla = async (fila: number, columna: number) => {
    const puedoJugar = validarJugada(fila, columna);
    
    if (puedoJugar) {
      await realizarJugada(fila, columna);
    }
  };

  const validarJugada = (fila: number, columna: number): boolean => {
    if (estadoPartida !== "jugando") {
      return false;
    }

    if (esMiTurno === false) {
      Alert.alert("Espera", "No es tu turno");
      return false;
    }

    if (tablero[fila][columna] !== "") {
      Alert.alert("Casilla ocupada", "Elige otra casilla");
      return false;
    }

    return true;
  };

  const realizarJugada = async (fila: number, columna: number) => {
    await viewModel.enviarJugada(fila, columna);
    setEsMiTurno(false);
    setMensaje("Turno del oponente");
  };

  const handleJugarDeNuevo = () => {
    router.replace("/views/V1IniciarPartida");
  };

  const renderCasilla = (fila: number, columna: number) => {
    const valor = tablero[fila][columna];
    const colorTexto = obtenerColorTexto(valor);
    const estaDeshabilitada = estadoPartida !== "jugando" || esMiTurno === false;

    return (
      <TouchableOpacity
        key={`${fila}-${columna}`}
        style={styles.casilla}
        onPress={() => handlePressCasilla(fila, columna)}
        disabled={estaDeshabilitada}
      >
        <Text style={[styles.textoCasilla, { color: colorTexto }]}>
          {valor}
        </Text>
      </TouchableOpacity>
    );
  };

  const obtenerColorTexto = (valor: string): string => {
    if (valor === "X") {
      return "#e74c3c";
    }
    
    if (valor === "O") {
      return "#3498db";
    }
    
    return "#eee";
  };

  const renderFila = (fila: number) => {
    return (
      <View key={fila} style={styles.fila}>
        {renderCasilla(fila, 0)}
        {renderCasilla(fila, 1)}
        {renderCasilla(fila, 2)}
      </View>
    );
  };

  const renderOverlayResultado = () => {
    const estaFinalizado = estadoPartida === "finalizado";
    
    if (estaFinalizado === false) {
      return null;
    }

    const infoResultado = obtenerInfoResultado();

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={estaFinalizado}
      >
        <View style={styles.overlayContainer}>
          <View style={styles.overlayContent}>
            <Text style={styles.icono}>{infoResultado.icono}</Text>
            <Text style={[styles.tituloResultado, { color: infoResultado.color }]}>
              {infoResultado.titulo}
            </Text>
            <Text style={styles.mensajeResultado}>{mensaje}</Text>

            <View style={styles.tableroFinal}>
              <Text style={styles.tableroTitulo}>Tablero Final</Text>
              {renderTableroFinal()}
            </View>

            <TouchableOpacity
              style={styles.botonJugarDeNuevo}
              onPress={handleJugarDeNuevo}
            >
              <Text style={styles.textoBoton}>Jugar de Nuevo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const obtenerInfoResultado = () => {
    const esVictoria = mensaje === "¡Has ganado!";
    const esDerrota = mensaje === "Has perdido";
    const esEmpate = mensaje === "Empate";

    if (esVictoria) {
      return { titulo: "¡VICTORIA!", color: "#27ae60", icono: "🏆" };
    }

    if (esDerrota) {
      return { titulo: "DERROTA", color: "#e74c3c", icono: "😢" };
    }

    if (esEmpate) {
      return { titulo: "EMPATE", color: "#f39c12", icono: "🤝" };
    }

    return { titulo: "RESULTADO", color: "#eee", icono: "🎮" };
  };

  const renderTableroFinal = () => {
    return tablero.map((fila, i) => (
      <View key={i} style={styles.filaFinal}>
        {fila.map((valor, j) => renderCasillaFinal(valor, j))}
      </View>
    ));
  };

  const renderCasillaFinal = (valor: string, index: number) => {
    const colorValor = obtenerColorTexto(valor);
    const valorMostrado = valor || "-";

    return (
      <View key={index} style={styles.casillaFinal}>
        <Text style={[styles.valorCasilla, { color: colorValor }]}>
          {valorMostrado}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tres en Raya</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.mensaje}>{mensaje}</Text>
        {viewModel.miSimbolo && (
          <Text style={styles.simbolo}>
            Tu símbolo: {viewModel.miSimbolo}
          </Text>
        )}
      </View>

      <View style={styles.tableroContainer}>
        {renderFila(0)}
        {renderFila(1)}
        {renderFila(2)}
      </View>

      {renderOverlayResultado()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
    padding: 20,
  },
  titulo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#eee",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  mensaje: {
    fontSize: 20,
    color: "#eee",
    marginBottom: 10,
    textAlign: "center",
  },
  simbolo: {
    fontSize: 18,
    color: "#aaa",
  },
  tableroContainer: {
    backgroundColor: "#0f3460",
    padding: 10,
    borderRadius: 10,
  },
  fila: {
    flexDirection: "row",
  },
  casilla: {
    width: 100,
    height: 100,
    backgroundColor: "#16213e",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#0f3460",
  },
  textoCasilla: {
    fontSize: 48,
    fontWeight: "bold",
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayContent: {
    backgroundColor: "#1a1a2e",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#0f3460",
    width: "90%",
    maxWidth: 400,
  },
  icono: {
    fontSize: 80,
    marginBottom: 15,
  },
  tituloResultado: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mensajeResultado: {
    fontSize: 20,
    color: "#aaa",
    marginBottom: 25,
  },
  tableroFinal: {
    backgroundColor: "#0f3460",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },
  tableroTitulo: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
  },
  filaFinal: {
    flexDirection: "row",
    justifyContent: "center",
  },
  casillaFinal: {
    width: 50,
    height: 50,
    backgroundColor: "#16213e",
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0f3460",
  },
  valorCasilla: {
    fontSize: 28,
    fontWeight: "bold",
  },
  botonJugarDeNuevo: {
    backgroundColor: "#27ae60",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    minWidth: 200,
    alignItems: "center",
  },
  textoBoton: {
    color: "#eee",
    fontSize: 18,
    fontWeight: "bold",
  },
});