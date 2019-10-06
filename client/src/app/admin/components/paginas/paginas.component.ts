import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import swal from 'sweetalert2'

@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
  styleUrls: ['./paginas.component.css']
})
export class PaginasComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  paginas

  constructor(private http: HttpClient) {
    this.http.get(this.URL_BACKEND + 'paginas').toPromise()
      .then(respuesta => {
        this.paginas = respuesta
      })
  }

  ngOnInit() {
  }

  async togglePagina(pagina) {
    let respuesta = await this.http.put(this.URL_BACKEND + 'paginas/toggle/' + pagina._id, {estado: pagina.estado}).toPromise()
    await swal.fire({
      title: 'Cambios guardados en ' + pagina.titulo
    })
    this.http.get(this.URL_BACKEND + 'paginas').toPromise()
      .then(respuesta => {
        this.paginas = respuesta
      })
  }

}
