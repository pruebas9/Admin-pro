// Modelo de usario con las propiedades de la base de datos

// Exportamos la clase para poder usarla fuera
export class Usuario {

    constructor(

        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) { }
}
