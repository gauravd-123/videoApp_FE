import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  showSearch: boolean = false;
  movies: any;
  availableMovies: any;
  menuOpen: boolean = false

  constructor(private cs: CommonService, private shared: SharedService, private router: Router, private loader: LoaderService){}

  async ngOnInit(): Promise<void> {
    await this.getPopularShows();
    this.getAvailableMovies();
    
  }
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; // Toggle the menu state
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  getAvailableMovies(){
    this.loader.showLoader();
    this.cs.getavailable().subscribe({
      next: (res: any) => {
        if(res.status == "Success"){
          this.availableMovies = res.urlList;
          this.loader.hideLoader();
        }
      }
    })

  }

  async getPopularShows(){
    
    this.cs.getPopularMovies().subscribe({
      next: (res: any) => {
        this.movies = res.results;
        // this.movies.forEach((movie: any) => {
        //   console.log("Movie: ", movie);
          
        // });
      },
      error: (err:any)=> {
        console.error("Error: ", err);
      }
    })
    
  }

  goWatchFromHome(clickedText: any){
    this.loader.showLoader();
    let searchTerm = this.cs.getImpWordsToSearch(clickedText);
    for(let i = 0; i < searchTerm.length; i++){
      this.cs.serachOmdbMovies(searchTerm[i]).subscribe( {
        next: (result: any) => {
          this.cs.searchResults = result ? [result] : [];
          if(this.cs.searchResults.length > 0){
            this.shared.setMovie(this.cs.searchResults[0]);
            localStorage.setItem('movieDetails', JSON.stringify(this.cs.searchResults[0]));
            this.router.navigateByUrl('/watch', {
              state: { movie: this.shared.getMovie() },
            });
          }
        },
        error: (err: any) => {
          console.error('Search error:', err);
        },
      }
      );
    }
  }
  
}
