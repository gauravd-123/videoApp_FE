import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private movie: any;
  constructor() { }

  setMovie(data: any){
    this.movie = data;
  }

  getMovie(){
    return this.movie;
  }
}
