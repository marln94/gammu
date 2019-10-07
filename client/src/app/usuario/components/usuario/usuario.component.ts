import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

import { ShortcutsService } from "../../services/shortcuts.service";
import { ApiService } from "../../services/api.service";
import * as M from 'materialize-css'
import { delay } from 'q';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'
  pagina
  esPrincipal = true
  isLogged
  usuario = {}

  constructor(private title: Title,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private shortcut: ShortcutsService,
    private api: ApiService) {

    this.api.isLogged().then(respuesta => {
      this.isLogged = respuesta

      this.api.getUsuario().then(respuesta => this.usuario = respuesta)

    })


    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then(data => {
        if (data.length > 0) {
          this.title.setTitle(data[0].titulo)
        }
      })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      if (params.get('url')) {
        this.esPrincipal = false

        await this.cargarPágina()
      }

    });
  }

  cerrarSesion() {
    this.api.logout().subscribe(r => {
      this.router.navigateByUrl('/')
      this.api.isLogged().then(respuesta => {
        this.isLogged = respuesta
      })
    })
  }

  async publicar(post) {
    let input = document.getElementById(post._id).value
    let respuesta = await this.http.post(this.URL_BACKEND + 'posts/' + post._id + '/comentarios', { texto: input, usuario: this.usuario }).toPromise()
    await this.cargarPágina()
  }

  async cargarPágina() {
    let respuesta = await this.http.get(this.URL_BACKEND + 'paginas/url/' + this.route.snapshot.params.url).toPromise()

    if (respuesta.length > 0) {
      this.pagina = respuesta[0]
      this.title.setTitle(this.pagina.titulo)

      if (this.pagina.tipo == 'html') {
        this.pagina.html = await this.shortcut.decodificarShortcuts(this.pagina.html)

        if (this.pagina.html.includes('slide')) {
          await delay(100)
          let elems = document.querySelectorAll('.slider');
          let instances = M.Slider.init(elems, {});
        }
      } else if (this.pagina.tipo == 'posts') {
        for (let post of this.pagina.posts) {
          post.html = await this.shortcut.decodificarShortcuts(post.html)

          if (post.html.includes('slide')) {
            await delay(100)
            let elems = document.querySelectorAll('.slider');
            let instances = M.Slider.init(elems, {});
          }
        }
      }
    }
  }

}
