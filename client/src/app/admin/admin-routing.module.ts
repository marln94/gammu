import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NecesitaAuthGuard } from "./guards/necesita-auth.guard";

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
import { CategoriasComponent } from "./components/categorias/categorias.component";
import { EditarPaginaHtmlComponent } from "./components/editar-pagina-html/editar-pagina-html.component";
import { EditarPostComponent } from "./components/editar-post/editar-post.component";
import { EditarPaginaPostsComponent } from "./components/editar-pagina-posts/editar-pagina-posts.component";


const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [NecesitaAuthGuard],
        children: [
            {
                path: 'archivos',
                component: ArchivosComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'comentarios',
                component: ComentariosComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'configuraciones',
                component: ConfiguracionesComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'archivos',
                component: ArchivosComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'pagina-principal',
                component: PaginaPrincipalComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'configuraciones',
                component: ConfiguracionesComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'paginas',
                component: PaginasComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'paginas/nueva-pagina-html',
                component: NuevaPaginaHtmlComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'paginas/nueva-pagina-posts',
                component: NuevaPaginaPostsComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'posts',
                component: PostsComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'posts/nuevo',
                component: NuevoPostComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'comentarios',
                component: ComentariosComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'menus',
                component: MenusComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'menus/nuevo',
                component: NuevoMenuComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'temas',
                component: TemasComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'temas/nuevo',
                component: NuevoTemaComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'seguridad',
                component: SeguridadComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'seguridad/nuevo-rol',
                component: NuevoRolComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'seguridad/nuevo-usuario',
                component: NuevoUsuarioComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'categorias',
                component: CategoriasComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'editar-pagina-html/:id',
                component: EditarPaginaHtmlComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'editar-pagina-posts/:id',
                component: EditarPaginaPostsComponent,
                canActivate: [NecesitaAuthGuard]
            },
            {
                path: 'editar-post/:id',
                component: EditarPostComponent,
                canActivate: [NecesitaAuthGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NecesitaAuthGuard]
})
export class AdminRoutingModule { }