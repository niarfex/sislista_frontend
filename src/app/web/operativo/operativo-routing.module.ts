import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGestionRegistroComponent } from './lista-gestion-registro/lista-gestion-registro.component';

const routes: Routes = [
  { path: 'lista-gestion-registro', component: ListaGestionRegistroComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperativoRoutingModule { }
