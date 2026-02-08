namespace Servidor3EnRaya.Entities
{
    /// <summary>
    /// Clase con la información general del juego
    /// </summary>
    public static class GameInfo
    {
        //variable que cuenta el número de jugadores actuales
        public static int numJugadores = 0;
        //empieza el jugador con la X
        public static string turnoActual = "X";
        //almacena el id de conexión de ambos jugadores
        public static string? connectionIdJugadorX = null;
        public static string? connectionIdJugadorO = null;
    }
}