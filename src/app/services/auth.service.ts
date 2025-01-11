import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.apiBaseUrl;
  private testUrl = environment.apiTestUrl;


  // {
  //   "userId": 12345,
  //   "userName": "testUser",
  //   "createOn": ""
  //   }
  getUser(userId: string): Observable<any>{
    return this.http.get(this.baseUrl + `Login/getUser?userId=${userId}`);
  }

  login(credentials: {username:string, password:string}){
    return this.http.post(this.baseUrl + 'Login/userLogin', credentials);
  }

  register(data: any){
    return this.http.post(this.baseUrl + 'Login/createUser', data);
  }
}
