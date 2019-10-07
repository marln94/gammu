import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as M from "materialize-css/dist/js/materialize";
import swal from 'sweetalert2'
import { delay } from 'q';

@Component({
  selector: 'app-editar-pagina-html',
  templateUrl: './editar-pagina-html.component.html',
  styleUrls: ['./editar-pagina-html.component.css']
})
export class EditarPaginaHtmlComponent implements OnInit {

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

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(async params => {
      this.http.get(this.URL_BACKEND + 'paginas/' + params.get('id')).toPromise()
        .then(respuesta => {
          this.htmlData = respuesta[0].html
          this.titulo = respuesta[0].titulo
          this.tituloMenu = respuesta[0].tituloMenu
          this.descripcion = respuesta[0].descripcion
          this.url = respuesta[0].url
          this.encabezado = respuesta[0].encabezado
          this.pie = respuesta[0].pie
          this.menu = respuesta[0].menu

          delay(100).then(() => {
            let chip = document.querySelector('.chips');
            if (respuesta[0].palabrasClave.length > 0) {
              let data = respuesta[0].palabrasClave.map(value => ({tag: value}))
              
              let palabrasClave = M.Chips.init(chip, {
                data: data
              });
            } else {
              let palabrasClave = M.Chips.init(chip, {});
            }
            M.updateTextFields()
          })
        })

    })
  }

  public onChange({ editor }: ChangeEvent) {
    this.htmlData = editor.getData();
  }


  async guardar() {
    let elem = document.querySelector('.chips');
    let palabrasClave = M.Chips.getInstance(elem);

    if (this.htmlData == '' || this.titulo == '' || this.url == '') {
      await swal.fire({
        title: 'Error',
        text: 'Campos incompletos'
      })
      return
    }

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
    formData['tipo'] = 'html'
    
    let respuesta = await this.http.put(this.URL_BACKEND + 'paginas/' + this.activeRoute.snapshot.params.id, formData).toPromise()
    await swal.fire({
      title: 'Éxito',
      text: 'La página se modificó correctamente',
      type: 'success'
    })
    this.router.navigate(['admin/paginas'])
  }

}
