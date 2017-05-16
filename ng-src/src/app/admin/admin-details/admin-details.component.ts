import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl } from "@angular/forms";

import { AdminService } from "../admin.service";

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent implements OnInit, OnDestroy {

  _section: any;
  _secId: String;
  errorMessage: String;
  sub: Subscription;
  sectionDetailsForm: FormGroup;
  isShowUploadModal = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {

    // Get Route Parameter
    this.sub = this._route.params.subscribe(
      params => {
        let id = params['_id'];
        this._secId = id;
      });

    this.adminService.getSectionById(this._secId).subscribe(
      section => {
        this._section = section.section;
        this.sectionDetailsForm.setValue({
          secTitle: this._section.secTitle,
          secContent: this._section.secContent
        });
      },
      error => this.errorMessage = <any>error);

    this.sectionDetailsForm = new FormGroup({
      secTitle: new FormControl(),
      secContent: new FormControl()
    });
  }

  onSectionUpdate() {
    let formField = this.sectionDetailsForm.controls;

    let result = {
      secTitle: formField.secTitle.value,
      secContent: formField.secContent.value,
    }

    let resultsNew = JSON.stringify(result);

    this.adminService.updateSection(this._secId, resultsNew).subscribe(
      data => {
        if (data.success) {
          console.log('Section Updated! ' + result);
        }
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  // Upload Image Modal
  uploadImageModal() {
    console.log("Upload Modal Open");
    this.adminService.isShowUploadModal = true;
    this.isShowUploadModal = this.adminService.isShowUploadModal;
  }


  // Upload Image
  uploadImage() {
    console.log("Upload Image");
  }

  // Close Upload Modal
  closeModal() {
    console.log('Close modal');
    this.isShowUploadModal = !this.isShowUploadModal;
  }

  // Remove Image
  removeImage() {

    let result = {
      secImage: 'assets/img/default.jpg'
    }
    let resultsNew = JSON.stringify(result);

    this.adminService.updateSection(this._secId, resultsNew).subscribe(
      data => {
        if (data.success) {
          console.log('Image Removed!');
          // this.alertService.success('Remove image success', 'Section remove image',
          //   { buttons: [{ title: 'OK', code: 'OK' }], timeout: 5000 });
          // this._section.section.secImg = '';
        }
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
