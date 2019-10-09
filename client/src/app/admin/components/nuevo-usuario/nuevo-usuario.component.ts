import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";
import swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  nombre = ''
  apellido = ''
  correo = ''
  contrasena = ''
  rol = ''

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    let selects = document.querySelectorAll('select');
    let instances = M.FormSelect.init(selects, {});
  }

  async crear() {
    if (this.nombre != '' && this.apellido != '' && this.correo != '' && this.contrasena != '' && this.rol != '') {
      let respuesta = await this.http.post(this.URL_BACKEND + 'usuarios', {
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        contrasena: this.contrasena,
        tipoUsuario: this.rol
      }).toPromise()
      await swal.fire({
        title: `Usuario ${respuesta['nombre']} creado con éxito`,
        type: 'success'
      })
      this.router.navigate(['/admin/seguridad'])
    } else {
      await swal.fire({
        title: 'Complete todos los campos',
        type: "warning"
      })
    }
  }

}
