import { Component, OnInit } from '@angular/core';

import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  _sections: any[];
  errorMessage: String;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllSections().subscribe(data => {
      this._sections = data.sections
    })
  }

}
