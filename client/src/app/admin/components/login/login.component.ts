import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo = '';
  contrasena = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log(this.correo, this.contrasena);

    this.api.login(this.correo, this.contrasena)
      .subscribe(
        r => {
          console.log('status: ', r);
          
          if (r['status'] == 1) {
            this.router.navigateByUrl('/admin/archivos');
          }
        },
        r => console.error(r.error.error)
      )
  }
}
