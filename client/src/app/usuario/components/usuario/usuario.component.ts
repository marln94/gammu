import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'
  pagina
  esPrincipal = true

  constructor(private title:Title, private http:HttpClient, private route:ActivatedRoute) { 
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then(data => {
        if (data.length > 0) {
          this.title.setTitle(data[0].titulo)
        }
      })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('url')) {
        this.esPrincipal = false
        this.http.get(this.URL_BACKEND + 'paginas/url/' + params.get('url')).toPromise()
          .then(respuesta => {
            if (respuesta.length > 0) {
              this.pagina = respuesta[0]
              this.title.setTitle(this.pagina.titulo)
            }
          })
      }
      
    });
  }

}
