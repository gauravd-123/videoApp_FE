import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { WatchComponent } from './pages/watch/watch.component';
import { SearchComponent } from './pages/search/search.component';
// import { UploadComponent } from './pages/upload/upload.component';

const appRoutes : Routes = [
  {'path': 'register', component: RegisterComponent},
  {'path': 'watch', component: WatchComponent},
  {'path': 'login', component: LoginComponent},
  {'path': '', component: HomeComponent, pathMatch: 'full'},

  // {'path': 'upload', component: UploadComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    WatchComponent
    // UploadComponent,
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    HttpClientModule,
    FormsModule,
    MatFormField,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
