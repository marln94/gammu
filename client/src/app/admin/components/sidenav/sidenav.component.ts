import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import * as M from "materialize-css/dist/js/materialize";

import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {

  visibilidad = true;

  @ViewChild('sidenav', {static: false}) sideNav: any;
  @ViewChild('dropdown1', {static: false}) dropdown1: any;

  constructor(private api:ApiService, private router:Router) { 
    
  }

  ngAfterViewInit() {
    let instanceSidenav = M.Sidenav.init(this.sideNav.nativeElement, {});
    let instanceDropdown = M.Dropdown.init(this.dropdown1.nativeElement, {});
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

  logout() {
    this.api.logout().subscribe(r => {
      this.router.navigateByUrl('/admin')
    })
  }

}
