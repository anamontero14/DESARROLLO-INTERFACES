import { Text, View, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useRef, useState } from "react";
import { Lista } from "@/components/Lista";

//#region DATOS
export const datos = [
  { id: '1', nombre: 'Elemento 1' },
  { id: '2', nombre: 'Elemento 2' },
  { id: '3', nombre: 'Elemento 3' },
  { id: '4', nombre: 'Elemento 4' },
  { id: '5', nombre: 'Elemento 5' },
  { id: '6', nombre: 'Elemento 6' },
  { id: '7', nombre: 'Elemento 7' },
  { id: '8', nombre: 'Elemento 8' },
  { id: '9', nombre: 'Elemento 9' },
  { id: '10', nombre: 'Elemento 10' },
  { id: '11', nombre: 'Elemento 11' },
  { id: '12', nombre: 'Elemento 12' },
  { id: '13', nombre: 'Elemento 13' },
  { id: '14', nombre: 'Elemento 14' },
  { id: '15', nombre: 'Elemento 15' },
  { id: '16', nombre: 'Elemento 16' },
  { id: '17', nombre: 'Elemento 17' },
  { id: '18', nombre: 'Elemento 18' },
  { id: '19', nombre: 'Elemento 19' },
  { id: '20', nombre: 'Elemento 20' },
  { id: '21', nombre: 'Elemento 21' },
  { id: '22', nombre: 'Elemento 22' },
  { id: '23', nombre: 'Elemento 23' },
  { id: '24', nombre: 'Elemento 24' },
  { id: '25', nombre: 'Elemento 25' },
  { id: '26', nombre: 'Elemento 26' },
  { id: '27', nombre: 'Elemento 27' },
  { id: '28', nombre: 'Elemento 28' },
  { id: '29', nombre: 'Elemento 29' },
  { id: '30', nombre: 'Elemento 30' },
  { id: '31', nombre: 'Elemento 31' },
  { id: '32', nombre: 'Elemento 32' },
  { id: '33', nombre: 'Elemento 33' },
  { id: '34', nombre: 'Elemento 34' },
  { id: '35', nombre: 'Elemento 35' },
  { id: '36', nombre: 'Elemento 36' },
  { id: '37', nombre: 'Elemento 37' },
  { id: '38', nombre: 'Elemento 38' },
  { id: '39', nombre: 'Elemento 39' },
  { id: '40', nombre: 'Elemento 40' },
  { id: '41', nombre: 'Elemento 41' },
  { id: '42', nombre: 'Elemento 42' },
  { id: '43', nombre: 'Elemento 43' },
  { id: '44', nombre: 'Elemento 44' },
  { id: '45', nombre: 'Elemento 45' },
  { id: '46', nombre: 'Elemento 46' },
  { id: '47', nombre: 'Elemento 47' },
  { id: '48', nombre: 'Elemento 48' },
  { id: '49', nombre: 'Elemento 49' },
  { id: '50', nombre: 'Elemento 50' },
  { id: '51', nombre: 'Elemento 51' },
  { id: '52', nombre: 'Elemento 52' },
  { id: '53', nombre: 'Elemento 53' },
  { id: '54', nombre: 'Elemento 54' },
  { id: '55', nombre: 'Elemento 55' },
  { id: '56', nombre: 'Elemento 56' },
  { id: '57', nombre: 'Elemento 57' },
  { id: '58', nombre: 'Elemento 58' },
  { id: '59', nombre: 'Elemento 59' },
  { id: '60', nombre: 'Elemento 60' },
  { id: '61', nombre: 'Elemento 61' },
  { id: '62', nombre: 'Elemento 62' },
  { id: '63', nombre: 'Elemento 63' },
  { id: '64', nombre: 'Elemento 64' },
  { id: '65', nombre: 'Elemento 65' },
  { id: '66', nombre: 'Elemento 66' },
  { id: '67', nombre: 'Elemento 67' },
  { id: '68', nombre: 'Elemento 68' },
  { id: '69', nombre: 'Elemento 69' },
  { id: '70', nombre: 'Elemento 70' },
  { id: '71', nombre: 'Elemento 71' },
  { id: '72', nombre: 'Elemento 72' },
  { id: '73', nombre: 'Elemento 73' },
  { id: '74', nombre: 'Elemento 74' },
  { id: '75', nombre: 'Elemento 75' },
  { id: '76', nombre: 'Elemento 76' },
  { id: '77', nombre: 'Elemento 77' },
  { id: '78', nombre: 'Elemento 78' },
  { id: '79', nombre: 'Elemento 79' },
  { id: '80', nombre: 'Elemento 80' },
  { id: '81', nombre: 'Elemento 81' },
  { id: '82', nombre: 'Elemento 82' },
  { id: '83', nombre: 'Elemento 83' },
  { id: '84', nombre: 'Elemento 84' },
  { id: '85', nombre: 'Elemento 85' },
  { id: '86', nombre: 'Elemento 86' },
  { id: '87', nombre: 'Elemento 87' },
  { id: '88', nombre: 'Elemento 88' },
  { id: '89', nombre: 'Elemento 89' },
  { id: '90', nombre: 'Elemento 90' },
  { id: '91', nombre: 'Elemento 91' },
  { id: '92', nombre: 'Elemento 92' },
  { id: '93', nombre: 'Elemento 93' },
  { id: '94', nombre: 'Elemento 94' },
  { id: '95', nombre: 'Elemento 95' },
  { id: '96', nombre: 'Elemento 96' },
  { id: '97', nombre: 'Elemento 97' },
  { id: '98', nombre: 'Elemento 98' },
  { id: '99', nombre: 'Elemento 99' },
  { id: '100', nombre: 'Elemento 100' },
];

//#endregion

export default function Index() {

  const scrollRef = useRef<FlatList>(null);
  const [showButton, setShowButton] = useState(false);

  // Esto detecta cuánto scrolleas
  const manejarScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  const scrollY = event.nativeEvent.contentOffset.y;
  
    if (scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Esto usa el scrollRef para volver arriba
  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Lista listaDatos={datos} />
      {showButton && (
        <TouchableOpacity 
          style={styles.fab}
          onPress={scrollToTop}
        >
          <Text style={styles.flechaArriba}>⬆️</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  itemTexto: {
    fontSize: 16,
    color: '#333',
  },
  // Estilos del botón flotante (FAB)
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  flechaArriba: {
    fontSize: 28,
    color: 'white',
  },
});