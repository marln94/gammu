import { Component, OnInit } from '@angular/core';

import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  posts = []

  constructor(private http:HttpClient, private router:Router) { 
    this.http.get(this.URL_BACKEND + 'posts').toPromise()
      .then(respuesta => {
        this.posts = respuesta
      })
  }

  ngOnInit() {
  }

  async eliminar(id) {
    let respuesta = await this.http.delete(this.URL_BACKEND + 'posts/' + id).toPromise()
    this.posts = await this.http.get(this.URL_BACKEND + 'posts').toPromise()
  }

  modificar(id) {
    this.router.navigate(['/admin/editar-post', id])
  }

}
