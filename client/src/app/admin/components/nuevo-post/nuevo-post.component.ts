import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import * as M from "materialize-css/dist/js/materialize";
import { delay } from 'q';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-nuevo-post',
  templateUrl: './nuevo-post.component.html',
  styleUrls: ['./nuevo-post.component.css']
})
export class NuevoPostComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  public Editor = ClassicEditor;
  public editorConfig = {
    removePlugins: ['MediaEmbed', 'ImageUpload', 'Link']
  }
  htmlData = ''
  titulo = ''
  imagen
  categoria = ''
  permiteComentarios = false


  categorias = []

  constructor(private http:HttpClient, private router: Router, private api:ApiService) { 
  }
  
  ngOnInit() {
    this.http.get(this.URL_BACKEND + 'categorias').toPromise()
      .then(respuesta => {
        this.categorias = respuesta
        delay(100).then(() => {
          let selects = document.querySelectorAll('select');
          let instances = M.FormSelect.init(selects, {});
        })
      })
    
  }

  ngAfterViewInit() {
  }

  onChange({ editor }: ChangeEvent) {
    this.htmlData = editor.getData();
  }

  cambio(event){
    this.imagen = event.target.files[0]
  }

  async guardar(){
    if (this.htmlData === '' || this.titulo === '' || this.categoria === '') {
      await swal.fire({
        title: 'Error',
        text: 'El post está vacío'
      })
      return
    }
    let formData = new FormData()

    formData.append('html', this.htmlData)
    formData.append('titulo', this.titulo)
    if (this.imagen) {
      formData.append('imagen', this.imagen, this.imagen.name)
    }
    formData.append('categoria', this.categoria)
    formData.append('permiteComentarios', JSON.stringify(this.permiteComentarios))

    let usuario = await this.api.getUsuario()
    formData.append('autor', usuario['_id'])

    let respuesta = await this.http.post(this.URL_BACKEND + 'posts', formData).toPromise()
    await swal.fire({
      title: 'Post creado correctamente'
    })
    this.router.navigate(['/admin/posts'])
  }

}
