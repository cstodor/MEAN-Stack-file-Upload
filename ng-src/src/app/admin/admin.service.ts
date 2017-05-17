import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AdminService {

  sections: any[];
  isShowUploadModal: boolean;

  constructor(private http: Http) { }

  // Get All Sections
  getAllSections(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/v1/sections/', { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }
  // Get All Uploads
  getAllMediaFiles(): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/v1/media/', { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }

  // Get Single Section By ID
  getSectionById(id: String): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/v1/sections/section/' + id, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }
  // Get Single Media File By ID
  getMediaFileById(id: String): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:4000/v1/media/' + id, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }

  // Update Existing Section
  updateSection(id, result): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:4000/v1/sections/section/' + id, result, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }
  // Update Existing Media File
  updateMediaFile(id: String, result): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:4000/v1/media/' + id, result, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Section By ID: ' + JSON.stringify(data)));
  }

  // Add Media File
  uploadMediaFile(file): Observable<any> {
    let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:4000/v1/media/upload/', file, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Upload File: ' + JSON.stringify(data)));
  }

  // Delete Media File
  deleteMediaFile(file): Observable<any> {
    let headers = new Headers();
    headers.append('Accept', file.filePath)
    return this.http.delete('http://localhost:4000/v1/media/' + file._id, { headers: headers })
      .map(res => res.json())
    // .do(data => console.log('Upload File: ' + JSON.stringify(data)));
  }
}
