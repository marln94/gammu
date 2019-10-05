import { Component, OnInit } from '@angular/core';

import * as M from "materialize-css/dist/js/materialize";

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';

import { HttpClient } from "@angular/common/http";
import swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'
  imagenSubir
  textoEncabezado
  textoPie
  htmlData

  public Editor = ClassicEditor;
  public editorConfig = {
    removePlugins: ['MediaEmbed', 'ImageUpload', 'Link']
  }

  constructor(private http: HttpClient) {
    this.http.get(this.URL_BACKEND + 'encabezados').toPromise()
      .then(data => {
        this.textoEncabezado = data[0].texto
      })
    this.http.get(this.URL_BACKEND + 'pies').toPromise()
      .then(data => {
        this.textoPie = data[0].texto
      })
    this.http.get(this.URL_BACKEND + 'paginas-principales').toPromise()
      .then(data => {
        this.htmlData = data[0].html
      })
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    M.updateTextFields()
  }

  public onChange({ editor }: ChangeEvent) {
    this.htmlData = editor.getData();
  }

  cambio(event) {
    this.imagenSubir = event.target.files[0]
  }

  async guardar() {
    let formData = new FormData()
    if (this.imagenSubir) {
      formData.append('imagen', this.imagenSubir, this.imagenSubir.name)
    }
    formData.append('textoEncabezado', this.textoEncabezado)
    let respuesta = await this.http.post(this.URL_BACKEND + 'encabezados', formData).toPromise()

    let respuesta2 = await this.http.post(this.URL_BACKEND + 'pies', { textoPie: this.textoPie }).toPromise()

    let respuesta3 = await this.http.post(this.URL_BACKEND + 'paginas-principales', { html: this.htmlData }).toPromise()

    swal.fire({
      title: 'Cambios guardados'
    })
  }

}
