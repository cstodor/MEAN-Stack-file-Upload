import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AdminService } from "../../admin.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @ViewChild("fileInput") inputFile;

  isShowUploadModal: boolean;
  isShowMediaFileDetails = false;
  selectedImage: any;
  mediaFiles: any;
  errorMessage: string;
  sub: Subscription;
  _secId: string;

  constructor(
    private adminService: AdminService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.sub = this._route.params.subscribe(
      params => {
        let id = params['_id'];
        this._secId = id;
      });

    this.adminService.getAllMediaFiles().subscribe(
      media => {
        this.mediaFiles = media.medias;
      },
      error => this.errorMessage = <any>error
    )
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();

      formData.append('imageFile', file, file.name);

      this.adminService.uploadMediaFile(formData).subscribe(
        data => {
          if (data.success) {
            console.log('Success!!!');
          }
        },
        err => {
          console.log(err);
          return false;
        }
      );
    }
  }

  selectSectionImage(img) {
    let selImage = img;

    let images = document.getElementsByClassName('media-file');

    for (let i = 0; i < images.length; i++) {
      let imgCL = images[i];
      imgCL.classList.remove('active');
    }

    if (selImage.className === 'media-file') {
      selImage.className = 'media-file active'
    } else {
      selImage.className = 'media-file'
    }

    let str = selImage.src;
    let imageName = str.substr(str.indexOf("uploads/") + 8);

    this.selectedImage = {
      secImage: 'assets/uploads/' + imageName
    }
    this.selectedImage = JSON.stringify(this.selectedImage);

  }

  setSectionImage() {

    if (this.selectedImage) {
      this.adminService.updateSection(this._secId, this.selectedImage).subscribe(
        data => {
          console.log(data);
          if (data.success) {
            console.log('Section Image Set!');
            this.closeModal();
          }
        },
        err => {
          console.log(err);
          return false;
        }

      );
    }
  }

  toggleMediaFileDetails(elem) {
    this.isShowMediaFileDetails = !this.isShowMediaFileDetails;
  }

  deleteMediaFile(elem) {
    let deletedElem = elem;
    console.log(deletedElem);
  }

  // Close Upload Modal
  closeModal() {
    console.log('Close modal');
    this.adminService.isShowUploadModal = false;
    this.isShowUploadModal = this.adminService.isShowUploadModal;
  }

}
