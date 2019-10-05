import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as M from "materialize-css/dist/js/materialize";


@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {

  archivos
  archivoSubir

  URL_BACKEND = 'http://localhost:3333/api/'

  instanciaModal
  codigoModal

  constructor(private http: HttpClient) {
    this.archivos = []
    this.obtenerArchivos()
  }

  ngOnInit() {
    var elems = document.querySelectorAll('.modal');
    this.instanciaModal = M.Modal.init(elems, {});
  }

  async obtenerArchivos() {
    this.archivos = await this.http.get(this.URL_BACKEND + 'archivos').toPromise()
  }

  cambio(event) {
    this.archivoSubir = event.target.files[0]
  }

  async subirArchivo() {
    let formData = new FormData()
    formData.append("archivo", this.archivoSubir, this.archivoSubir.name)
    await this.http.post(this.URL_BACKEND + 'archivos', formData).toPromise()

    let input = <HTMLInputElement>document.getElementById('archivo')
    input.value = null
    this.obtenerArchivos()

  }

  async eliminarArchivo(id) {
    await this.http.delete(this.URL_BACKEND + 'archivos/' + id).toPromise()
    this.obtenerArchivos()
  }

  mostrarModal(codigo) {
    this.codigoModal = codigo
    this.instanciaModal[0].open()
  }
}
