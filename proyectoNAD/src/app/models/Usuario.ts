export class Usuario {
    _id?: number;
    nombreUsuario?: string;
    apePaterno?: string;
    apeMaterno?: string;
    email?: string;
    edad?: number;
    genero?: string;
    rol?: string;
    empresa?: string;
    status?: number;
    contrasena?:string;

    constructor(nombreUsuario: string, apePaterno: string, apeMaterno: string, edad: number, rol: string, email: string, genero: string, empresa: string, contrasena: string) {
        this.nombreUsuario=nombreUsuario;
        this.apePaterno=apePaterno;
        this.apeMaterno=apeMaterno;
        this.edad=edad;
        this.empresa=empresa;
        this.email = email;
        this.genero = genero;
        this.rol = rol;
        // this.status=1;
        this.contrasena=contrasena;
    }
}