import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PlaylistComponent } from './playlist/playlist.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import { TokenStorageService } from './services/token-storage.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { MiniPlayerComponent } from './mini-player/mini-player.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PlaylistComponent,
    LandingPageComponent,
    TopNavbarComponent,
    MiniPlayerComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatGridListModule,
    DialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenStorageService, multi: true },TopNavbarComponent,HomeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
