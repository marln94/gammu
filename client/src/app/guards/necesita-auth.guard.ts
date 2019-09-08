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

    console.log(await this.api.isLogged());
    if (await this.api.isLogged()) {
      
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/admin/login'], {
        queryParams: {
          redirectUrl
        }
      }
      )
    );

    return false;

  }

}
