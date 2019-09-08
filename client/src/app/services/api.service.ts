import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(correo, contrasena) {
    return this.http.post('http://localhost:3333/api/login', {
      correo: correo,
      contrasena: contrasena
    }, {
      withCredentials: true
    });
  }

  isLogged() {
    return new Promise(resolve => {
      this.http.get('http://localhost:3333/api/logged', {
        withCredentials: true
      }).subscribe(
        r => {
          resolve(r)
        }
      )
    })

  }

  logout() {
    return this.http.get('http://localhost:3333/api/logout', {
      withCredentials: true
    });
  }
}
