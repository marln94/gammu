import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  texto
  imagen

  constructor(private http:HttpClient, private sanitization:DomSanitizer) {
    this.http.get(this.URL_BACKEND + 'encabezados').toPromise()
      .then(data => {
        this.texto = data[0].texto
        this.imagen = data[0].imagen.replace(/\\/g, '/')
        this.imagen = this.sanitization.bypassSecurityTrustStyle(`url(${this.imagen})`);
        
      })
  }

  ngOnInit() {
  }

}
