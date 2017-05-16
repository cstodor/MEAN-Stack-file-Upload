import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
