import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from "./usuario-routing.module";


import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContenidoComponent } from "./components/contenido/contenido.component";
import { EncabezadoComponent } from "./components/encabezado/encabezado.component";
import { PieComponent } from "./components/pie/pie.component";
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';



@NgModule({
  declarations: [
    UsuarioComponent,
    ContenidoComponent,
    EncabezadoComponent,
    PieComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
