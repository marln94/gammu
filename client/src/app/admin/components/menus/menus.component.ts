import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  URL_BACKEND = 'http://localhost:3333/api/'

  menus

  constructor(private http:HttpClient) { 
    this.http.get(this.URL_BACKEND + 'menus').toPromise()
      .then(respuesta => this.menus = respuesta)
  }

  ngOnInit() {
  }

}
