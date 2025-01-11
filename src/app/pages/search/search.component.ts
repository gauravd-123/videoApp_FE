import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, forkJoin, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environment';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private http: HttpClient, private cs: CommonService, private dataService: DataService, private router: Router, private shared: SharedService){}

  searchTerm: string = '';
  searchResults: any[] = [];
  private searchSubject: Subject<string> = new Subject();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms pause in typing
        distinctUntilChanged() // Only emit if the value changes
      )
      .subscribe((searchText) => {
        if (searchText.trim().length >= 3) {
          this.performSearch(searchText);
        }
      });
  }

  // searchMovie(title: string): Observable<any> {
  //   const omdbUrl = `${environment.omdbUrl}?type=movie&t=${title}&apikey=${environment.omdbApiKey}`;
  //   const r2Url = `${environment.r2DevUrl}?key=${this.videoTitle}`;

  //   return forkJoin({
  //     omdbData: this.http.get(omdbUrl),
  //     // r2Data: this.http.get(r2Url),
  //   }).pipe(
  //     map(({ omdbData }) => ({
  //       poster: omdbData['Poster'],
  //       title: omdbData['Title'],
  //       description: omdbData['Plot'],
  //       videoUrl: r2Url, // Assuming backend returns { url: <video-url> }
  //     }))
  //   );
  // }

  onSearchKeyUp(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value;
    this.searchSubject.next(input);
  }

  performSearch(searchText: string): void {
    this.cs.serachOmdbMovies(searchText).subscribe(
      (result: any) => {
        this.searchResults = result ? [result] : [];
      },
      (error) => {
        console.error('Search error:', error);
      }
    );
  }

  onSearch(ev: any) {
    if (this.searchTerm.trim()) {
      this.cs.serachOmdbMovies(this.searchTerm).subscribe(
        (result: any) => {
          this.searchResults = result ? [result] : [];
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
    // this.dataService.movie = movie;
    this.shared.setMovie(movie);
    localStorage.setItem('movieDetails', JSON.stringify(movie));
    this.router.navigateByUrl('/watch', {
      
      state: {movie: this.shared.getMovie()}
    });

  }
}
