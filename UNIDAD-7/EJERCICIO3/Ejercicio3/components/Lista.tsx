import { View, Text, StyleSheet, FlatList } from 'react-native';

type Props = {
  listaDatos: Array<{ id: string; nombre: string }>
  scrollRef: any
  manejarScroll: (e: any) => void
}

export function Lista({ listaDatos, scrollRef, manejarScroll }: Props) {
  return (
    <FlatList
      ref={scrollRef}
      data={listaDatos}
      keyExtractor={(item) => item.id}
      onScroll={manejarScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.lista}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTexto}>{item.nombre}</Text>
        </View>
      )}
    />
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
    elevation: 3, // para Android
  },
  itemTexto: {
    fontSize: 16,
    color: '#333',
  },
});