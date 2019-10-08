import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import * as M from "materialize-css/dist/js/materialize";

import { ApiService } from "../../services/api.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  
  URL_BACKEND = 'http://localhost:3333/api/'

  visibilidad = true;
  isLogged
  usuario = {}
  logo

  @ViewChild('sidenav', {static: false}) sideNav: any;

  constructor(private api:ApiService, private router:Router, private http:HttpClient) { 
    this.api.isLogged().then(data => {
      this.isLogged = data
      this.api.getUsuario().then(data => this.usuario = data)
    })
    this.http.get(this.URL_BACKEND + 'configuraciones').toPromise()
      .then(respuesta => this.logo = respuesta[0].logo)
  }

  ngAfterViewInit() {
    let instanceSidenav = M.Sidenav.init(this.sideNav.nativeElement, {});
  }

  ngOnInit() {
  }

  closeSidenav(){
    const full = document.querySelector('.sidenav-trigger');
    const style = getComputedStyle(full)
    if(style.display != 'none'){
      let instance = M.Sidenav.getInstance(this.sideNav.nativeElement);
      instance.close();
    }
  }

  cerrarSesion() {
    this.api.logout().subscribe(r => {
      this.router.navigateByUrl('/')
    })
  }

}
