import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_BACKEND = 'http://localhost:3333/api/'

  constructor(private http: HttpClient) { }

  login(correo, contrasena) {
    return this.http.post(this.URL_BACKEND + 'login', {
      correo: correo,
      contrasena: contrasena
    }, {
      withCredentials: true
    });
  }

  isLogged() {
    // return new Promise(resolve => {
    //   this.http.get(this.URL_BACKEND + 'logged', {
    //     withCredentials: true
    //   }).subscribe(
    //     r => {
    //       resolve(r)
    //     }
    //   )
    // })
    return true
  }

  logout() {
    return this.http.get(this.URL_BACKEND + 'logout', {
      withCredentials: true
    });
  }
}
