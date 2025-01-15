import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  searchResults: any[] = [];

  isUndefinedOrNull(val: any){
    if(val==null || val == undefined || val == ""){
      return false;
    }
    return true;
  }

  getVideoUrlByKey(key: string){
    return this.http.get(`${environment.apiBaseUrl}R2/GetVideoUrlByKey?key=${key}`);
  }

  serachOmdbMovies(title: string){
  //   const omdbUrl = `${environment.omdbUrl}?type=movie&t=${title}&apikey=${environment.omdbApiKey}`;

    return this.http.get(`${environment.omdbUrl}?type=movie&t=${title}&apikey=${environment.omdbApiKey}`)
  }

  getPopularMovies(){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjliNGZiOTYzNGUzZGQ3MmU4ZWIwNDBlMzA3NDFjNCIsIm5iZiI6MTczNTEzOTYxMC4yMDMsInN1YiI6IjY3NmMyMTFhMTQyN2IzOTcwZjdlYWY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1wjMQmCzcUq9s1-49TyBmIGHoT1UkTjFB41B9sOz3NA'
      }
    }
    return this.http.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
  }

  getavailable(){
    return this.http.get(`${environment.apiBaseUrl}R2/GetAvailble`);
  }




  ////common apis
  performSearch(searchText: string, page: string = ""): void {
      this.serachOmdbMovies(searchText).subscribe(
        (result: any) => {
          this.searchResults = result ? [result] : [];
        },
        (error) => {
          console.error('Search error:', error);
        }
      );
  }

  getImpWordsToSearch(search: string): string[] {
    console.log("Original Search String:", search);

  // Clean the string by removing unwanted characters
  const cleanedString = search
    .replace(/\.|\[.*?\]|\d{3,4}p|x264|BluRay|AAC|mp4|-|[\[\]]/gi, " ")
    .replace(/\.|\[.*?\]|\d{3,4}p|x264|BluRay|AAC|mp4|-|[\[\]]/gi, " ") // Remove unwanted patterns
    .replace(/\s+/g, " ") // Replace multiple spaces with one
    .trim();

  console.log("Cleaned String:", cleanedString);

  // Split into words
  const words = cleanedString.split(" ").filter(word => word.trim() !== "");

  console.log("Words Array:", words);

  // Return up to the first 3 words
  const firstThreeWords = words.slice(0, 3);

  console.log("First Three Words:", firstThreeWords);

  return firstThreeWords;
    
  } 
  // https://www.omdbapi.com/?type=movie&t=A Bronx Tale&apikey=30285199
}
