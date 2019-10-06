import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AceEditorModule } from "ng2-ace-editor";

import { AdminComponent } from './components/admin/admin.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ArchivosComponent } from './components/archivos/archivos.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { PaginasComponent } from './components/paginas/paginas.component';
import { NuevaPaginaHtmlComponent } from './components/nueva-pagina-html/nueva-pagina-html.component';
import { NuevaPaginaPostsComponent } from './components/nueva-pagina-posts/nueva-pagina-posts.component';
import { PostsComponent } from './components/posts/posts.component';
import { NuevoPostComponent } from './components/nuevo-post/nuevo-post.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { MenusComponent } from './components/menus/menus.component';
import { NuevoMenuComponent } from './components/nuevo-menu/nuevo-menu.component';
import { NuevoTemaComponent } from './components/nuevo-tema/nuevo-tema.component';
import { TemasComponent } from './components/temas/temas.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { NuevoRolComponent } from './components/nuevo-rol/nuevo-rol.component';
import { NuevoUsuarioComponent } from './components/nuevo-usuario/nuevo-usuario.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidenavComponent,
    ArchivosComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    ConfiguracionesComponent,
    PaginasComponent,
    NuevaPaginaHtmlComponent,
    NuevaPaginaPostsComponent,
    PostsComponent,
    NuevoPostComponent,
    ComentariosComponent,
    MenusComponent,
    NuevoMenuComponent,
    NuevoTemaComponent,
    TemasComponent,
    SeguridadComponent,
    NuevoRolComponent,
    NuevoUsuarioComponent,
    CategoriasComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AceEditorModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
