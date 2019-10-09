import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_BACKEND = 'http://localhost:3333/api/'

  constructor(private http: HttpClient) { }

  async login(correo, contrasena) {
    let respuesta = await this.http.post(this.URL_BACKEND + 'login', {
      correo: correo,
      contrasena: contrasena
    }, {
      withCredentials: true
    }).toPromise();

    return respuesta
  }

  async getUsuario() {
    let respuesta = await this.http.get(this.URL_BACKEND + 'usuariosesion', {
      withCredentials: true
    }).toPromise();

    return respuesta
  }

  async isLogged() {
    return await this.http.get<boolean>(this.URL_BACKEND + 'logged', {
      withCredentials: true
    }).toPromise()
  }

  logout() {
    return this.http.get(this.URL_BACKEND + 'logout', {
      withCredentials: true
    });
  }
}
