import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import * as M from "materialize-css/dist/js/materialize";
import swal from 'sweetalert2'

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  titulo = ''
  descripcion = ''
  palabrasClave = []
  favicon
  logo
  css = '';
  javascript = '';
  options = { maxLines: 1000, printMargin: false };

  constructor(private http: HttpClient) {
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then((data: Array<any>) => {
        if (data.length > 0) {
          this.titulo = data[0].titulo
          this.descripcion = data[0].descripcion
          this.css = data[0].css
          this.javascript = data[0].javascript
        }
      })
  }

  ngOnInit() {
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then((data: Array<any>) => {
        if (data.length > 0) {
          if (data[0].palabrasClave) {
            for (let p of data[0].palabrasClave) {
              this.palabrasClave.push({ tag: p })
            }
            let elem = document.querySelector('.chips');
            let palabrasClave = M.Chips.init(elem, {
              data: this.palabrasClave
            });
          } else {
            let elem = document.querySelector('.chips');
            let palabrasClave = M.Chips.init(elem, {});
          }
        } else {
          let elem = document.querySelector('.chips');
          let palabrasClave = M.Chips.init(elem, {});
        }
      })

  }

  ngAfterViewChecked() {
    M.updateTextFields()
  }

  cambioLogo(e) {
    this.logo = e.target.files[0]
  }

  cambioFavicon(e) {
    this.favicon = e.target.files[0]
  }

  async guardar() {

    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);

    let formData = new FormData()
    if (this.favicon) {
      formData.append('favicon', this.favicon, this.favicon.name)
    }
    if (this.logo) {
      formData.append('logo', this.logo, this.logo.name)
    }
    formData.append('titulo', this.titulo)
    formData.append('descripcion', this.descripcion)

    if (palabrasClave.chipsData) {
      for (let p of palabrasClave.chipsData) {
        formData.append('palabrasClave', p.tag)
      }
    }
    formData.append('css', this.css)
    formData.append('javascript', this.javascript)
    let respuesta = await this.http.post(this.URL_BACKEND + 'configuraciones', formData).toPromise()

    swal.fire({
      title: 'Cambios guardados'
    })
  }

}
