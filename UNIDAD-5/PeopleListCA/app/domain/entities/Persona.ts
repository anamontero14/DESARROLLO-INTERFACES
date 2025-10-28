export class Persona{

    //atributos de la persona
    private _id: number;
    private _nombre: string;
    private _apellido: string;
    private _edad: number;

    //constructor con todos sus atributos privados
    constructor( _id: number ,_nombre: string, _apellido: string, _edad: number) {
        this._id = _id;
        this._nombre = _nombre;
        this._apellido = _apellido;
        this._edad = _edad;
    }

    //#region GETTERS Y SETTERS

    get id(): number {
        return this._id;
    }

    //método get del atributo nombre
    get nombre(): string {
        return this._nombre;
    }

    //actualizar el nombre
    set nombre(value : string){
        this._nombre = value;
    }

    //método get para el apellido
    get apellido(): string {
        return this._apellido;
    }

    //método set para actualizar el apellido de la persona
    set apellido(value: string) {
        this._apellido = value;
    }

    //métodos get y set para la edad
    get edad(): number {
        return this._edad
    }

    set edad(value: number){
        this._edad = value
    }
    //#endregion

}