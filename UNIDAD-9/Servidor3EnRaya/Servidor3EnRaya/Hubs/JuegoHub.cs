using Microsoft.AspNetCore.SignalR;
using Servidor3EnRaya.Entities;

namespace Servidor3EnRaya.Hubs
{
    public class JuegoHub : Hub
    {
        /// <summary>
        /// Función que se ejecuta cada vez que un jugador se conecta
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            //se aumenta el número de jugadores cuando uno se conecta
            GameInfo.numJugadores++;

            //si el numero de jugadores es todavía solo 1
            if (GameInfo.numJugadores == 1)
            {
                //le asigna aljugador con ese id el simbolo x
                GameInfo.connectionIdJugadorX = Context.ConnectionId;
                await Clients.Caller.SendAsync("AsignarSimbolo", "X");
            }
            //si el número de jugadores es 2
            else if (GameInfo.numJugadores == 2)
            {
                //le asigna a ese id de conexión el símbolo O
                GameInfo.connectionIdJugadorO = Context.ConnectionId;
                await Clients.Caller.SendAsync("AsignarSimbolo", "O");
                //y comienza la partida
                await Clients.All.SendAsync("IniciarPartida");
            }
            else
            {
                // Si hay más de 2 jugadores, rechazar la conexión
                Context.Abort();
            }

            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Función que se ejecuta siempre que alguien se desconecte
        /// </summary>
        /// <param name="exception"></param>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Identificar quién se desconectó
            if (Context.ConnectionId == GameInfo.connectionIdJugadorX)
            {
                GameInfo.connectionIdJugadorX = null;
            }
            else if (Context.ConnectionId == GameInfo.connectionIdJugadorO)
            {
                GameInfo.connectionIdJugadorO = null;
            }

            // Decrementar jugadores
            if (GameInfo.numJugadores > 0)
            {
                GameInfo.numJugadores--;
            }

            // Si se queda solo 1 o ninguno, resetear todo
            if (GameInfo.numJugadores <= 0)
            {
                //resetea todos los valores para que se le obligue a los jugadores
                //a conectarse de nuevo
                GameInfo.numJugadores = 0;
                GameInfo.turnoActual = "X";
                GameInfo.connectionIdJugadorX = null;
                GameInfo.connectionIdJugadorO = null;
            }

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Función que se ejecuta cada vez que se mande un movimiento
        /// </summary>
        /// <param name="obj">Objeto de tipo Jugada que lleva todos los datos
        /// sobre la jugada que se acaba de hacer</param>
        public async Task MandarMovimiento(Jugada obj)
        {
            //variable auxiliar para comprobar si el turno es válido o no
            bool esTurnoValido = false;
            //si el símbolo de la jugada es X y el id de conexión del contexto es igual al
            //id de conexión que está almacenado en el game info y si el turno actual del
            //game info es del jugador x
            if (obj.simbolo == "X" && Context.ConnectionId == GameInfo.connectionIdJugadorX
                && GameInfo.turnoActual == "X")
            {
                //el turno es válido
                esTurnoValido = true;
            }
            //si es lo mismo pero con el jugador 2
            else if (obj.simbolo == "O" && Context.ConnectionId == GameInfo.connectionIdJugadorO
                && GameInfo.turnoActual == "O")
            {
                //el turno también es válido
                esTurnoValido = true;
            }

            //si el turno ES válido
            if (esTurnoValido)
            {
                //se iguala el turno actual del game info comprobando si el turno actual es X
                //si ES X entonces se iguala a O y si no lo es se iguala a X
                GameInfo.turnoActual = GameInfo.turnoActual == "X" ? "O" : "X";
                //se le pasa el movimiento a todos los clientes
                await Clients.All.SendAsync("MovimientoRealizado", obj);
            }
        }
    }
}