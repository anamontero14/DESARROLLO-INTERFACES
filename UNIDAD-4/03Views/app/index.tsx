import { Text, View, StyleSheet} from "react-native";

export default function Index() {
  return (
    <View>
      <View style={styles.header}><Text style={styles.texto}>HEADER</Text></View>
      <View style={styles.body}>
        <View style={styles.body1}></View>
        <Text style={styles.texto}>CONTENT</Text>
        <View style={styles.body1}></View>
      </View>
      <View style={styles.footer}><Text style={styles.texto}>FOOTER</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#00FFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },

  body: {
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1390%'
  },

  body1: {
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
    height: '1390%'
  },

  footer: {
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'
  },

  texto: {
    color: '#3B64E7',
  }

})