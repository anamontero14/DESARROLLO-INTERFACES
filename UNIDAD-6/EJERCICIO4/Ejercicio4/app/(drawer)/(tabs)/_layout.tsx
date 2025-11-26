import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs 
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#ffffffff",
                borderTopColor: "#222",
                height: 60
            }
        }}>
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: "Inicio",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
                }}
            />
            <Tabs.Screen 
                name="configuration" 
                options={{ title: "Configuración", tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ), headerShown: false
                }}
            />
    </Tabs>
  );
}