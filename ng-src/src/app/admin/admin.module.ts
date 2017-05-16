import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Do we need this import?
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Services
import { AdminService } from "./admin.service";
// Modules
import { AdminRoutingModule } from './admin-routing.module';
// Components
import { AdminComponent } from './admin.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    AdminDetailsComponent,
    FileUploadComponent
  ],
  providers: [AdminService]
})
export class AdminModule { }
