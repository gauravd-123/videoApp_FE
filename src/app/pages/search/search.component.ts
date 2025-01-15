import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, forkJoin, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environment';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient, public cs: CommonService, private dataService: DataService, 
    private router: Router, private shared: SharedService, private loader: LoaderService
  ){}

  searchTerm: string = '';
  // searchResults: any[] = [];
  private searchSubject: Subject<string> = new Subject();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms pause in typing
        distinctUntilChanged() // Only emit if the value changes
      )
      .subscribe((searchText) => {
        if (searchText.trim().length >= 3) {
          this.cs.performSearch(searchText);
        }
      });
  }


  onSearchKeyUp(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchSubject.next(input);
  }


  onSearch(ev: any) {
    if (this.searchTerm.trim()) {
      this.cs.serachOmdbMovies(this.searchTerm).subscribe(
        (result: any) => {
          this.cs.searchResults = result ? [result] : [];
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
    }
  }

  getVideoUrl(key: string){
  //  https://localhost:7294/api/R2/
    this.cs.getVideoUrlByKey(key).subscribe({
      next: (res:any) => {
        if(res.status == "Success"){
          this.dataService.videoTitle = res.urlList[0].FileName;
        } else if(res.status == ""){
          console.log("Video not available");
        }
      },
      error: (err: any) => {
        console.error('Error fetching video urls', err);
      }
    });
  }

  goToWatch(movie: any){
    this.loader.showLoader();
    // this.dataService.movie = movie;
    this.shared.setMovie(movie);
    localStorage.setItem('movieDetails', JSON.stringify(movie));
    this.router.navigateByUrl('/watch', {
      
      state: {movie: this.shared.getMovie()}
    });

  }
}
