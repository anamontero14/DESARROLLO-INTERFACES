import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="views/V1IniciarPartida" />
      <Stack.Screen name="views/V2Juego" />
      <Stack.Screen name="views/V3Resultado" />
    </Stack>
  );
}