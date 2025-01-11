import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showSearch: boolean = false;

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
