import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  texto
  URL_BACKEND = 'http://localhost:3333/api/'


  constructor(private http:HttpClient) { 
    this.http.get(this.URL_BACKEND + 'pies').toPromise()
      .then(data => {
        this.texto = data[0].texto
      })
  }

  ngOnInit() {
  }

}
