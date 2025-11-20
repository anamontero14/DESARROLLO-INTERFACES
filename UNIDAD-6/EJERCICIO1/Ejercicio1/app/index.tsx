import { View, StyleSheet } from "react-native";
import { TarjetaProducto } from "../components/TarjetaProducto"
import { BotonAddToCart } from "../components/BotonAddToCart"
import { Carrito } from "../components/Carrito"
import { useState } from "react";

export default function Index() {

  const [contador, setContador] = useState(0);

  const contadorAddToCart = () => {
    setContador(contador => contador += 1);
  };

  return (
    <View style={style.container}>
        <TarjetaProducto name="Reloj HIPER-Bueno.13" 
        price={34.0} 
        image={'../../reloj.png'} 
        onAddToCart={contadorAddToCart}>

        <BotonAddToCart text="Añadir al carrito" 
        onClick={contadorAddToCart}>

        </BotonAddToCart>

        <Carrito cantidad={contador}></Carrito>

        </TarjetaProducto>
    </View>
  );
}

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});
