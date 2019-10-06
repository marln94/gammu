import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as M from "materialize-css/dist/js/materialize";
import swal from 'sweetalert2'

@Component({
  selector: 'app-nueva-pagina-html',
  templateUrl: './nueva-pagina-html.component.html',
  styleUrls: ['./nueva-pagina-html.component.css']
})
export class NuevaPaginaHtmlComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  public Editor = ClassicEditor;
  public editorConfig = {
    removePlugins: ['MediaEmbed', 'ImageUpload', 'Link']
  }

  htmlData = ''
  titulo = ''
  tituloMenu = ''
  descripcion = ''
  url = ''
  encabezado = false
  pie = false
  menu = false

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit() {
    let chip = document.querySelector('.chips');
    let selects = document.querySelectorAll('select');
    let instances = M.FormSelect.init(selects, {});
    let palabrasClave = M.Chips.init(chip, {});
  }

  public onChange({ editor }: ChangeEvent) {
    this.htmlData = editor.getData();
  }

  cambioPalabrasclave(p) {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);
    console.log(palabrasClave.chipsData)
  }

  async crear() {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);

    let formData = {}
    
    
    formData['html'] = this.htmlData
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

    let respuesta = await this.http.post(this.URL_BACKEND + 'paginas', formData).toPromise()
    await swal.fire({
      title: 'Éxito',
      text: 'La página se creó correctamente',
      type: 'success'
    })
    this.router.navigate(['admin/paginas'])
  }
}
