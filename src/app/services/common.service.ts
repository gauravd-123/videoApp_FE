import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

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
}
