namespace Servidor3EnRaya.Entities
{
    public class Jugada
    {
        //array que almacenará el movimiento de la jugada actual
        public int[] movimiento { get; set; }
        //almacena el símbolo de la jugada actual
        public string simbolo { get; set; }
        /// <summary>
        /// El objeto estará construido por el movimiento que haya hecho el
        /// jugador Y por el SÍMBOLO del jugador actual
        /// </summary>
        /// <param name="movimiento"></param>
        /// <param name="simbolo"></param>
        public Jugada(int[] movimiento, string simbolo)
        {
            this.movimiento = movimiento;
            this.simbolo = simbolo;
        }
    }
}