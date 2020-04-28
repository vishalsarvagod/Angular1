import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { SideNavComponent } from './side-nav/side-nav.component';


const routes: Routes = [
  { path: '', component: SideNavComponent },
  { path: 'books', component: DataTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
