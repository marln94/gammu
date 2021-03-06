import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = '';
  contrasena = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  async login() {
    let respuesta = await this.api.login(this.correo, this.contrasena)

    if (respuesta['status'] == 1) {
      if (respuesta['usuario']['tipoUsuario'] == 'admin') {
        this.router.navigateByUrl('/admin/archivos');
      } else if (respuesta['usuario']['tipoUsuario'] == 'registrado') {
        this.router.navigateByUrl('/');
      }

    }
  }
}
