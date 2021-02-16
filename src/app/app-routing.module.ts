import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  GameCardComponent,
  GamesListComponent,
  LoginComponent,
  ShoppingCartComponent,
} from './components';

const routes: Routes = [
  { path: 'games', component: GamesListComponent, data: { title: 'Games List' } },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games/:id', component: GameCardComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
