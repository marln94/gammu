import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2'

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
  
  URL_BACKEND = 'http://localhost:3333/api/'

  usuarios = []  

  constructor(private http:HttpClient) { 
    this.http.get<any[]>(this.URL_BACKEND + 'usuarios').toPromise()
      .then(respuesta => this.usuarios = respuesta)
  }

  ngOnInit() {
  }

  async eliminar(usuario) {
    let respuesta = await this.http.delete(this.URL_BACKEND + 'usuarios/' + usuario._id).toPromise()
    await swal.fire({
      title: 'Éxito',
      text: `Usuario eliminado exitosamente`,
      type: 'success'
    })
    this.usuarios = await this.http.get<any[]>(this.URL_BACKEND + 'usuarios').toPromise()
  }

}
