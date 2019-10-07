import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ApiService } from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class NecesitaAuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = next['_routerState']['url'];

    let usuario = await this.api.getUsuario()

    if (await this.api.isLogged()) {
      if (usuario.tipoUsuario == 'admin'){
        return true;
      } else {
        this.router.navigate(['/'])
        return false
      }      
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/usuario/login'], {
        queryParams: {
          redirectUrl
        }
      }
      )
    );

    return false;

  }

}
