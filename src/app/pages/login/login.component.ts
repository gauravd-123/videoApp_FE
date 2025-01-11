import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  // imports: [MatFormFieldModule, MatInputModule],
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private auth: AuthService, private cs: CommonService, public dataService: DataService, private router: Router){}

  username: string = ""
  passwd: string = ""
  contactNo: string = ""
  email: string = ""

  ngOnInit(): void {
    // this.auth.getUser('12345').subscribe({
    //   next: (res: any) => {
    //     if (this.cs.isUndefinedOrNull(res?.userName)) {
    //       console.log('getUser:', res);
    //     } else {
    //       console.log('User Name:', res.userName);
    //     }
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching user:', error);
    //   },
    //   complete: () => {
    //     console.log('User fetching completed.');
    //   }
    // });
  }

  login(event: any){
    var cred = {
      username: this.username,
      password : this.passwd
    }
    this.auth.login(cred).subscribe({
      next: (res: any) => {
        if(res?.status == "Success"){
          this.dataService.isAuthenticatedUser = true;
          this.router.navigateByUrl('/');
        }
      },
      error: (err: any)=>{
        console.log("Not an authenticate user");
      },
      complete: ()=> {
        console.log("User authenticated");
      }
    });
  }

  register(ev: any){
    var data = {
      userName: this.username,
      password: this.passwd,
      contactNo: this.contactNo,
      emailId: this.email
    }
    this.auth.register(data).subscribe({
      next: (res:any) => {
        if(res?.status == "Success"){
          this.router.navigateByUrl('/');
        }
      },
      error: (err: any) => {
        console.log("User not registered");
      }
    })
  }

  toggleLogin(){
    this.dataService.isUserRegistered = !this.dataService.isUserRegistered;
  }
}
