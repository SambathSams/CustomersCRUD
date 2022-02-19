import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './components/customers/customers.component';

const routes: Routes = [
  {
    path:'home',component:CustomersComponent
  }, 
  {
    path:'', redirectTo:'home', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
