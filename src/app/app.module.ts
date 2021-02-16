import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FooterMenuComponent,
  GameCardComponent,
  GamesListComponent,
  LoginComponent,
  MainMenuComponent,
  ShoppingCartComponent,
} from './components';
import { ClickStopPropagationDirective, DelayedInputDirective } from './directives';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { AuthenticationService } from './services';
import { GamesService } from './services/games.service';
import { OrdersService } from './services/orders.service';
import { GamesEffects, gameStoreReducers, OrderEffects, UserEffects } from './store';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    GameCardComponent,
    ShoppingCartComponent,
    MainMenuComponent,
    FooterMenuComponent,
    LoginComponent,
    DelayedInputDirective,
    ClickStopPropagationDirective,
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
    StoreModule.forRoot(gameStoreReducers, {
      runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
    }),
    EffectsModule.forRoot([GamesEffects, OrderEffects, UserEffects]),
  ],
  providers: [
    GamesService,
    OrdersService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
