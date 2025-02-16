import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  collectionName = ''
  emailKay = 'Public email'
  constructor(private http: HttpClient) {}

  onUpload(files: FileList | null) {
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('collectionName', this.collectionName);
      formData.append('emailKay', this.emailKay);

      this.http
        .post(environment.API_BASEURL + '/api/excel/upload' , formData, {params: {collectionName: this.collectionName}})
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
