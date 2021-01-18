import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { GamesService } from './services/games-service';

@NgModule({
  declarations: [AppComponent, GamesListComponent, MainMenuComponent, FooterMenuComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [GamesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
