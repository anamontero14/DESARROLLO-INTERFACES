import { Drawer } from "expo-router/drawer"
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
            <Drawer.Screen name="index" options={{ title:"Índice",
                drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
            }}/>
            <Drawer.Screen name="profile" options={{ title: "Perfil",
                drawerIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    )
            }}/>
            <Drawer.Screen name="settings" options={{ title: "Ajustes",
                drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    )
             }}/>
        </Drawer>
    );
}