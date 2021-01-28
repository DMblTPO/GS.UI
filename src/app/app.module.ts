import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { LoginComponent } from './components/login';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { GamesService } from './services/games.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    MainMenuComponent,
    FooterMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    GamesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
