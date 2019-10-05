import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isLogged = false;

  constructor(public api:ApiService, private router:Router) {
    router.events.forEach( async event => {
      // if (event instanceof NavigationStart) {
        this.isLogged = await this.api.isLogged();
        
      // }
    })
  }

  ngOnInit() {
  }

}
