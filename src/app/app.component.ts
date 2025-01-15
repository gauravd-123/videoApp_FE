import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'streamApp_FE';
  loaderStatus: boolean = false;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.loaderStatus$.subscribe((status) => {
      this.loaderStatus = status;
    });
  }
}
