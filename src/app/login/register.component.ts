import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Importamos para los formularios
import { Router } from '@angular/router'; // Para trabajar con las rutas
import { UsuarioService } from '../services/service.index'; // Servicio de usuarios
import { Usuario } from '../models/usuario.model'; // Modelo de Usuario

// Para los mensajes flash. Más información en: https://github.com/t4t5/sweetalert
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';


// Llamamos a la función que hemos creado dentro de /assets/js/custom.js
// para que se inicialicen los plugins externos
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {

  formRegistro: FormGroup;
  swal: SweetAlert = _swal as any; // Para los mensajes de alertas

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  // =================================================================================
  // Validar que dos campos son iguales (ej: contraseñas)
  // =================================================================================
  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value; // Valor del campo1
      const pass2 = group.controls[campo2].value; // Valor del campo2

      // Si son iguales, retorno null
      if (pass1 === pass2) {
        return null;
      }

      // Si no son iguales, retorno true en este formato
      return {
        sonIguales: true
      };
    };
  }


  ngOnInit() {

    init_plugins();

    // Creamos el formulario de registro usando ReactiveFormsModule
    this.formRegistro = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'password2')});

    // Seteo valores por defecto al formulario
    this.formRegistro.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true

    });
  }



  // =================================================================================
  // Función para el registro de usuarios
  // =================================================================================
  registrarUsuario() {

    // Si el formulario no es válido no hago nada
    if (!this.formRegistro.valid) {
      return;
    }

    if (!this.formRegistro.value.condiciones) {
      // Plugin para alertas. Más información en: https://github.com/t4t5/sweetalert
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    // Creamos un objeto usuario, inicializamos en el constructor con los  valores del formulario y lo enviamos a la petición
    const usuario = new Usuario(
      this.formRegistro.value.nombre,
      this.formRegistro.value.correo,
      this.formRegistro.value.password
    );

    // Llamamos al servicio que hace la petición a la API para crear el usuario
    this._usuarioService.crearUsuario(usuario).subscribe(response => {

        // Si el usuario se crea correctamente (no vienen errores), redirecciono al login
        this.router.navigate(['/login']);
    });

  }

}
