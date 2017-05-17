import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sections: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllSections().subscribe(data => {
      this.sections = data.sections
    });
  }


}
