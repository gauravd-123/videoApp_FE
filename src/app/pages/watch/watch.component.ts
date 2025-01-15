import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { LoaderService } from 'src/app/services/loader.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-watch',
  standalone: false,
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {
  movie: any;
  videoUrl: string | null = null;
  isVideoPlayerActive: boolean = false;

  constructor(
    private router: Router,
    private cs: CommonService,
    private dataService: DataService,
    private shared: SharedService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    // const state = this.router.getCurrentNavigation()?.extras.state as any;
    // this.movie = state?.movie || null;

    this.movie = this.shared.getMovie();
    const movieData = localStorage.getItem('movieDetails');
    if (movieData) {
      this.movie = JSON.parse(movieData);
      this.loader.hideLoader();

    }
    // this.movie = this.dataService.movie;
    if (!this.dataService.movie) {
      // this.router.navigate(['/']); // Redirect if no movie details
    }
  }

  watchMovie() {
    this.isVideoPlayerActive = true;
    this.loader.showLoader();
    this.cs.getVideoUrlByKey(this.movie.Title).subscribe(
      (res: any) => {

        this.videoUrl = environment.r2DevUrl + res.urlList[0].fileName;
    this.loader.hideLoader();
        
      },
      (error) => {
        console.error('Error fetching video URL:', error);
      }
    );
  }
  closeVideoPlayer(){
    this.isVideoPlayerActive = false;
  }
  backToHome(){
    this.router.navigateByUrl("/");
  }
}
