import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  constructor(private title:Title, private http:HttpClient) { 
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then(data => {
        if (data.length > 0) {
          console.log(data[0]);
          
          this.title.setTitle(data[0].titulo)
        }
      })
  }

  ngOnInit() {
  }

}
