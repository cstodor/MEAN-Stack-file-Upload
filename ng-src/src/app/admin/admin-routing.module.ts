import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AdminComponent } from './admin.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: ':_id', component: AdminDetailsComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
