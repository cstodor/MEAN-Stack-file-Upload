import { Component, OnInit, ViewChild } from '@angular/core';

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
  mediaFiles: any;
  errorMessage: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
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


  toggleMediaFileDetails(elem) {
    this.isShowMediaFileDetails = !this.isShowMediaFileDetails;
  }

  deleteMediaFile() {

  }

  // Close Upload Modal
  closeModal() {
    console.log('Close modal');
    this.adminService.isShowUploadModal = false;
    this.isShowUploadModal = this.adminService.isShowUploadModal;
  }

}
