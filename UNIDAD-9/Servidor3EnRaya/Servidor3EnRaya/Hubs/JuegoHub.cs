using Microsoft.AspNetCore.SignalR;
using Servidor3EnRaya.Entities;

namespace Servidor3EnRaya.Hubs
{
    public class JuegoHub : Hub
    {
        /// <summary>
        /// Es el método que se ejecuta automáticamente cada vez que 
        /// se conecta un usuario
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            Console.WriteLine("=================================");
            Console.WriteLine($"JUGADOR CONECTADO: {Context.ConnectionId}");

            GameInfo.numJugadores++;

            if (GameInfo.numJugadores == 1)
            {
                GameInfo.connectionIdJugadorX = Context.ConnectionId;
                Console.WriteLine($"Asignado como JUGADOR X");
                // Enviar símbolo al jugador 1
                await Clients.Caller.SendAsync("AsignarSimbolo", "X");
            }
            else if (GameInfo.numJugadores == 2)
            {
                GameInfo.connectionIdJugadorO = Context.ConnectionId;
                Console.WriteLine($"Asignado como JUGADOR O");
                // Enviar símbolo al jugador 2
                await Clients.Caller.SendAsync("AsignarSimbolo", "O");
                // Iniciar partida
                await Clients.All.SendAsync("IniciarPartida");
            }

            Console.WriteLine("=================================");
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Es el método que se ejecuta cuando un jugador hace una jugada
        /// y sirve para poder comunicarse, mandando un objeto de la clase
        /// jugada
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public async Task MandarMovimiento(Jugada obj)
        {
            //variable para verificar si el jugador puede hacer este movimiento
            bool esTurnoValido = false;
            /*if que comprueba que: 
             * que la jugada dice ser X, 
             * que quien la envía es realmente el jugador X, 
             * y que es el turno de X*/
            if (obj.simbolo == "X" && Context.ConnectionId == GameInfo.connectionIdJugadorX 
                && GameInfo.turnoActual == "X")
            {
                esTurnoValido = true;
            }
            //comprueba lo mismo solo que para el jugador O
            else if (obj.simbolo == "O" && Context.ConnectionId == GameInfo.connectionIdJugadorO 
                && GameInfo.turnoActual == "O")
            {
                esTurnoValido = true;
            }

            //si el turno no es válido no hace nada
            if (!esTurnoValido)
            {
                return;
            }

            //sirve para cambiar el turno al siguiente jugador
            GameInfo.turnoActual = GameInfo.turnoActual == "X" ? "O" : "X";

            //envian los movimientos a todos los jugadores
            await Clients.All.SendAsync("MovimientoRealizado", obj);
        }
    }
}