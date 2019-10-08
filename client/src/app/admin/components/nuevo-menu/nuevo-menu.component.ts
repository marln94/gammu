import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-menu',
  templateUrl: './nuevo-menu.component.html',
  styleUrls: ['./nuevo-menu.component.css']
})
export class NuevoMenuComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  nombre = ''
  paginas
  enlaces = [{url: '', nombre: ''}]

  constructor(private http:HttpClient, private router:Router) { 
    this.http.get(this.URL_BACKEND + 'paginas/?estado=activa').toPromise()
      .then(respuesta => this.paginas = respuesta)
  }

  ngOnInit() {
  }

  agregarEnlace() {
    this.enlaces.push({url: '', nombre: ''})
  }

  async crear() {
    let formData = {}

    if (this.nombre == '') return
    formData['nombre'] = this.nombre

    formData['paginas'] = []
    for (let pagina of this.paginas) {
      if (pagina.incluir) {
        formData['paginas'].push({
          _id: pagina._id,
          nombre: pagina.tituloMenu,
          url: pagina.url
        })
      }
    }
    if (formData['paginas'].length == 0) return

    formData['enlaces'] = []
    for (let enlace of this.enlaces) {
      if (enlace.url != ''){
        formData['enlaces'].push({
          url: enlace.url,
          nombre: enlace.nombre
        })
      }
    }
    if (formData['enlaces'].length == 0) return

    let respuesta = await this.http.post(this.URL_BACKEND + 'menus', formData).toPromise()
    await swal.fire({
      title: 'Éxito',
      text: 'Menú guardado correctamente',
      type: 'success'
    })
    this.router.navigate(['/admin/menus'])
  }
}
