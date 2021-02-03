import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { LoginComponent } from './components/login';
import { FooterMenuComponent, MainMenuComponent } from './components/main-layout';
import { DelayedInputDirective } from './directives/delayed-input/delayed-input.directive';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { GamesService } from './services/games.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    MainMenuComponent,
    FooterMenuComponent,
    LoginComponent,
    DelayedInputDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
  ],
  providers: [
    GamesService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
