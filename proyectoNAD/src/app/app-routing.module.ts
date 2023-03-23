import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioEstandarComponent } from './components/usuario-estandar/usuario-estandar.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'admin/:_id', component: AdministradorComponent},
  {path: 'user/:_id', component: UsuarioEstandarComponent},
  {path: 'editar-user/:id', component:EditarUsuarioComponent},
  {path: '**', redirectTo:'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
