namespace SignalRChat2.Hubs
{
    public class clsMensajeUsuario
    {
        public string nombre { get; set; }
        public string mensaje { get; set; }

        public clsMensajeUsuario(string nombre, string mensaje) { 
            this.nombre = nombre;
            this.mensaje = mensaje;
        }
    }
}
