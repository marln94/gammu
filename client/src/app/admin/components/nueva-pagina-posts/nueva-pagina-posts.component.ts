import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as M from "materialize-css/dist/js/materialize";
import swal from 'sweetalert2'
import { delay } from 'q';

@Component({
  selector: 'app-nueva-pagina-posts',
  templateUrl: './nueva-pagina-posts.component.html',
  styleUrls: ['./nueva-pagina-posts.component.css']
})
export class NuevaPaginaPostsComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  categoria = ''
  titulo = ''
  tituloMenu = ''
  descripcion = ''
  url = ''
  encabezado = false
  pie = false
  menu = false

  categorias = []

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<any[]>(this.URL_BACKEND + 'categorias').toPromise()
      .then(respuesta => this.categorias = respuesta)
  }

  ngOnInit() {
    this.http.get<any[]>(this.URL_BACKEND + 'categorias').toPromise()
      .then(respuesta => {
        this.categorias = respuesta
        delay(100).then(() => {
          let chip = document.querySelector('.chips');
          let selects = document.querySelectorAll('select');
          let instances = M.FormSelect.init(selects, {});
          let palabrasClave = M.Chips.init(chip, {});
        })
      })
  }

  async crear() {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);

    if (this.categoria == '' || this.titulo == '' || this.url == '') {
      await swal.fire({
        title: 'Error',
        text: 'Campos incompletos'
      })
      return
    }

    let formData = {}

    formData['categoria'] = this.categoria
    formData['titulo'] = this.titulo
    formData['tituloMenu'] = this.tituloMenu
    formData['descripcion'] = this.descripcion
    if (palabrasClave.chipsData) {
      formData['palabrasClave'] = []
      for (let p of palabrasClave.chipsData) {
        formData['palabrasClave'].push(p.tag)
      }
    }
    formData['url'] = this.url
    formData['encabezado'] = this.encabezado
    formData['pie'] = this.pie
    formData['menu'] = this.menu
    formData['tipo'] = 'posts'

    let respuesta = await this.http.post(this.URL_BACKEND + 'paginas', formData).toPromise()
    await swal.fire({
      title: 'Éxito',
      text: 'La página se creó correctamente',
      type: 'success'
    })
    this.router.navigate(['admin/paginas'])
  }

}
