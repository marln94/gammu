import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  htmlData
  URL_BACKEND = 'http://localhost:3333/api/'

  constructor(private http:HttpClient) { 
    this.http.get(this.URL_BACKEND + 'paginas-principales').toPromise()
      .then(data => {
        this.htmlData = data[0].html
      })
  }

  ngOnInit() {
  }

}
