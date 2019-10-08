import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShortcutsService {

  URL_BACKEND = 'http://localhost:3333/api/'

  constructor(private http: HttpClient) { }

  async decodificarShortcuts(html: string) {
    let shortcuts = html.match(/{[^<>]+}/g)

    if (!shortcuts) return html


    for (let sc of shortcuts) {
      let scJSON = JSON.parse(sc.replace(/'/g, '"'))
      switch (scJSON.tipo) {
        case 'imagen':
          let imagen = await this.http.get(this.URL_BACKEND + 'archivos/' + scJSON.id).toPromise()
          let htmlImagen = `<img class="responsive-img" src="${imagen[0]['ruta']}">`
          html = html.replace(sc, htmlImagen)
          break;

        case 'galeria':
          let ids = scJSON.imagenes.map(value => 'ids=' + value)
          ids = ids.join('&')
          let imagenes = await this.http.get(this.URL_BACKEND + 'archivos/galeria?' + ids).toPromise()
          let htmlGaleria = `
          <div class="slider">
            <ul class="slides">`
          for (let imagen of imagenes) {
            htmlGaleria += `<li>
              <img src="${imagen['ruta'].replace(/\\/g, '/')}">
            </li>`
          }
          htmlGaleria += `
            </ul>
          </div>
          `
          html = html.replace(sc, htmlGaleria)
          break;

        case 'enlace':
          let archivo = await this.http.get(this.URL_BACKEND + 'archivos/' + scJSON.id).toPromise()
          let htmlArchivo = `<a href="${archivo[0].ruta}" target="_blank">${scJSON.titulo || 'Descargar'}</a>`
          html = html.replace(sc, htmlArchivo)
          break;

        case 'entrada':
          let post = await this.http.get(this.URL_BACKEND + 'posts/' + scJSON.id).toPromise()
          let htmlPost = `
          <div class="col s12 m8 offset-m2" *ngFor="let post of pagina.posts">
            <div class="card">
              <div class="card-image">
                  <img src="${post[0].imagen || '/assets/upload/default.jpg'}">
                  <span class="card-title">${post[0].titulo}</span>
              </div>
              <div class="card-content">
                ${await this.decodificarShortcuts(post[0].html)}  
              </div>
            </div>
          </div>
          `
          html = html.replace(sc, htmlPost)
          break;

        case 'menu':
          let menu = await this.http.get(this.URL_BACKEND + 'menus/' + scJSON.id).toPromise()
          let htmlMenu = `
          <div class="nav-wrapper">
          <nav>
            <div class="nav-wrapper indigo lighten-1">
              <ul>`
          for (let pagina of menu['paginas']) {
            htmlMenu += `<li><a href="${pagina.url}">${pagina.nombre}</a></li>`
          }
          for (let enlace of menu['enlaces']) {
            htmlMenu += `<li><a href="http://${enlace.url}">${enlace.nombre}</a></li>`
          }
          htmlMenu +=    `
              </ul>
            </div>
          </nav>
          `
          html = html.replace(sc, htmlMenu)
          break;

        default:
          break;
      }
    }
    return html
  }
}
