import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  constructor(private http: HttpClient) {}

  onUpload(files: FileList | null) {
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append('file', file, file.name);

      this.http
        .post('http://localhost:3001/api/excel/upload', formData)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
