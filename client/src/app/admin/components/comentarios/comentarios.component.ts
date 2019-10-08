import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  posts = []
  textoModal = ''
  instanciaModal

  constructor(private http:HttpClient) { 
    this.http.get(this.URL_BACKEND + 'posts/todos/comentarios').toPromise()
      .then(respuesta => {
        this.posts = respuesta
      })
  }

  ngOnInit() {
    var elems = document.querySelectorAll('.modal');
    this.instanciaModal = M.Modal.init(elems, {});
  }

  mostrarModal(texto) {
    this.textoModal = texto
    this.instanciaModal[0].open()
  }

  async eliminarComentario(postId, comentarioId){
    let respuesta = await this.http.delete(this.URL_BACKEND + 'posts/' + postId + '/comentarios/' + comentarioId).toPromise()
    console.log(respuesta)
    this.posts = await this.http.get(this.URL_BACKEND + 'posts/todos/comentarios').toPromise()
  }

}
