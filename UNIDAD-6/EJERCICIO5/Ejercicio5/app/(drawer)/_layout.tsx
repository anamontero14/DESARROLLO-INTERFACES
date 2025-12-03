import { Drawer } from "expo-router/drawer"
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
            <Drawer.Screen 
                name="(home)" 
                options={{ 
                    title:"Home",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />
            <Drawer.Screen 
                name="ajustes" 
                options={{ 
                    title: "Ajustes",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    )
                }}
            />
        </Drawer>
    );
}