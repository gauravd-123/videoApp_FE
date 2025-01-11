// import { Component } from '@angular/core';
// import * as tus from 'tus-js-client';

// @Component({
//   selector: 'app-upload',
//   templateUrl: './upload.component.html',
//   styleUrls: ['./upload.component.css'],
// })
// export class UploadComponent {
//   file: File | null = null;
//   uploadProgress: number = -1;

//   onFileSelected(event: any): void {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       this.file = files[0];
//     }
//   }

//   startUpload(): void {
//     if (!this.file) {
//       return;
//     }

//     const upload = new tus.Upload(this.file, {
//       endpoint: 'https://your-cloudflare-r2-upload-url', // Replace with your TUS endpoint
//       chunkSize: 5 * 1024 * 1024, // 5MB chunks (optional)
//       retryDelays: [0, 1000, 3000, 5000], // Retry delays
//       metadata: {
//         filename: this.file.name,
//         filetype: this.file.type,
//       },
//       onError: (error) => {
//         console.error('Upload failed:', error);
//       },
//       onProgress: (bytesUploaded, bytesTotal) => {
//         this.uploadProgress = Math.floor((bytesUploaded / bytesTotal) * 100);
//       },
//       onSuccess: () => {
//         console.log('Upload completed successfully.');
//         this.uploadProgress = 100;
//       },
//     });

//     upload.start();
//   }
// }
