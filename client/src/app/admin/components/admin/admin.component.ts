import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  isLogged = false;
  configuraciones

  constructor(public api: ApiService, private router: Router, private http: HttpClient, private title: Title) {
    router.events.forEach(async event => {
      this.isLogged = await this.api.isLogged();
    })
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then(respuesta => {
        this.configuraciones = respuesta[0]
        if (this.configuraciones && this.configuraciones.favicon) {
          document.getElementById('favicon').setAttribute('href', this.configuraciones.favicon)
        }
        if (this.configuraciones && this.configuraciones.titulo != '') {
          this.title.setTitle(this.configuraciones.titulo)
        }
      })
  }

  ngOnInit() {
  }

}
