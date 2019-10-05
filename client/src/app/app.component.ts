import { Component } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";

import { ApiService } from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'gammu';
  isLogged = false;

  constructor(public api:ApiService, private router:Router) {
    // router.events.forEach( async event => {
    //   if (event instanceof NavigationStart) {
    //     this.isLogged = await this.api.isLogged();
    //   }
    // })
  }

}
