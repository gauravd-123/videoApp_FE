import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  
  isAuthenticatedUser: boolean = false;
  isUserRegistered: boolean = false;
  videoTitle: string = "";
  movie: any;

}
