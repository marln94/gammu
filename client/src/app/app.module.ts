// import { MaterializeModule } from "angular2-materialize";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AceEditorModule } from "ng2-ace-editor";

import { AppComponent } from './app.component';
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

const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'admin/archivos',
    component: ArchivosComponent
  },
  {
    path: 'admin/pagina-principal',
    component: PaginaPrincipalComponent
  },
  {
    path: 'admin/configuraciones',
    component: ConfiguracionesComponent
  },
  {
    path: 'admin/paginas',
    component: PaginasComponent
  },
  {
    path: 'admin/paginas/nueva-pagina-html',
    component: NuevaPaginaHtmlComponent
  },
  {
    path: 'admin/paginas/nueva-pagina-posts',
    component: NuevaPaginaPostsComponent
  },
  {
    path: 'admin/posts',
    component: PostsComponent
  },
  {
    path: 'admin/posts/nuevo',
    component: NuevoPostComponent
  },
  {
    path: 'admin/comentarios',
    component: ComentariosComponent
  },
  {
    path: 'admin/menus',
    component: MenusComponent
  },
  {
    path: 'admin/menus/nuevo',
    component: NuevoMenuComponent
  },
  {
    path: 'admin/temas',
    component: TemasComponent
  },
  {
    path: 'admin/temas/nuevo',
    component: NuevoTemaComponent
  },
  {
    path: 'admin/seguridad',
    component: SeguridadComponent
  },
  {
    path: 'admin/seguridad/nuevo-rol',
    component: NuevoRolComponent
  },
  {
    path: 'admin/seguridad/nuevo-usuario',
    component: NuevoUsuarioComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
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
    NuevoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CKEditorModule,
    AceEditorModule
    // MaterializeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
