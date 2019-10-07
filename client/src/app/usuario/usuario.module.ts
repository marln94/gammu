import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UsuarioRoutingModule } from "./usuario-routing.module";

import localeEsHn from "@angular/common/locales/es-HN";

import { UsuarioComponent } from './components/usuario/usuario.component';
import { ContenidoComponent } from "./components/contenido/contenido.component";
import { EncabezadoComponent } from "./components/encabezado/encabezado.component";
import { PieComponent } from "./components/pie/pie.component";
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { LoginComponent } from './components/login/login.component';

registerLocaleData(localeEsHn)

@NgModule({
  declarations: [
    UsuarioComponent,
    ContenidoComponent,
    EncabezadoComponent,
    PieComponent,
    PaginaPrincipalComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-HN'}]
})
export class UsuarioModule { }
