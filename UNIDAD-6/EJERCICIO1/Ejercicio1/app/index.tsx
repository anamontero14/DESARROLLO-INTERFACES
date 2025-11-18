import { View } from "react-native";
import { TarjetaProducto } from "../components/TarjetaProducto"
import { BotonAddToCart } from "../components/BotonAddToCart"
import { useState } from "react";

export default function Index() {

  const [contador, setContador] = useState(0);

  const contadorAddToCart = () => {
    setContador(contador => contador += 1);
  };

  return (
    <View>
        <TarjetaProducto name="Reloj HIPER-Bueno.13" 
        price={34.0} 
        image={'../../reloj.png'} 
        onAddToCart={contadorAddToCart}>

        </TarjetaProducto>

        <BotonAddToCart text="Añadir al carrito" 
        onClick={contadorAddToCart}>

        </BotonAddToCart>
    </View>
  );
}

