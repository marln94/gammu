import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2'

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'
  nombre = ''
  categorias = []

  constructor(private http: HttpClient) {
    this.http.get<any[]>(this.URL_BACKEND + 'categorias').toPromise()
      .then(respuesta => {
        this.categorias = respuesta
      })
  }

  ngOnInit() {
  }

  async guardar() {
    if (this.nombre == '') return
    let respuesta = await this.http.post(this.URL_BACKEND + 'categorias', { nombre: this.nombre }).toPromise()
    this.categorias = await this.http.get<any[]>(this.URL_BACKEND + 'categorias').toPromise()
    this.nombre = ''
  }

  async eliminar(id) {
    let respuesta = await this.http.delete(this.URL_BACKEND + 'categorias/' + id).toPromise()
    await swal.fire({
      title: 'Categoría eliminada'
    })
    this.categorias = await this.http.get<any[]>(this.URL_BACKEND + 'categorias').toPromise()
  }

}
