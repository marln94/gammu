import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent } from "./components/usuario/usuario.component";
import { ContenidoComponent } from "./components/contenido/contenido.component";
import { EncabezadoComponent } from "./components/encabezado/encabezado.component";
import { PieComponent } from "./components/pie/pie.component";
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path: '',
                component: PaginaPrincipalComponent
            }
        ]
    },
    {
        path: ':url',
        component: UsuarioComponent,
    },
    {
        path: 'usuario/login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule { }