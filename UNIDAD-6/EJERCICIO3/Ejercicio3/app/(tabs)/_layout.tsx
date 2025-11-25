import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#121212",
                borderTopColor: "#222",
                height: 60
            }
        }}>
            <Tabs.Screen name="index" options={{ title: "Inicio"}}/>
            <Tabs.Screen name="profile" options={{ title: "Perfil"}}/>
            <Tabs.Screen name="search" options={{ title: "Buscar"}}/>
    </Tabs>
  );
}
