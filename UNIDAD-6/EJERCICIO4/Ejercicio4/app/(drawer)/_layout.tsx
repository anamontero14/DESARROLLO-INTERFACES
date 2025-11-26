import { Drawer } from "expo-router/drawer"

export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title:"Índice" }}/>
            <Drawer.Screen name="profile" options={{ title: "Perfil" }}/>
            <Drawer.Screen name="settings" options={{ title: "Ajustes" }}/>
        </Drawer>
    );
}