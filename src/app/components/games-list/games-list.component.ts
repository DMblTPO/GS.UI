import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '@app/models';
import {
  addItemToOrder,
  allGamesStor,
  GameStoreState,
  orderStor,
  startLoadingGames,
} from '@app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
})
export class GamesListComponent implements OnInit {
  games$: Observable<Game[]>;
  genres$: Observable<string[]>;
  selectedGenres: string[] = [];
  searchText = '';

  shoppingCart$: Observable<Order>;

  get isAnySelected() {
    return this.selectedGenres && this.selectedGenres.length > 0;
  }

  get filteredGames$() {
    let filteredByGenre = (game: Game) => true;
    let filteredBySearch = (game: Game) => true;
    if (this.isAnySelected) {
      filteredByGenre = (game) => {
        return game.genres.findIndex((g) => this.selectedGenres.includes(g)) > -1;
      };
    }
    if (this.searchText) {
      filteredBySearch = (game) => {
        const name = game.name.toLowerCase();
        return name.indexOf(this.searchText) > -1;
      };
    }
    return this.games$.pipe(map((games) => games.filter(filteredByGenre).filter(filteredBySearch)));
  }

  constructor(private readonly store: Store<GameStoreState>) {}

  ngOnInit(): void {
    this.games$ = this.store.select(allGamesStor);
    this.genres$ = this.games$.pipe(
      map((games) =>
        games
          .reduce((acc, val) => acc.concat(val.genres), [])
          .filter((v, i, a) => a.indexOf(v) === i)
      )
    );
    this.shoppingCart$ = this.store.select(orderStor);
    this.store.dispatch(startLoadingGames());
  }

  showGenres(genres: string[]) {
    if (genres && Array.isArray(genres)) {
      return genres.join(' / ');
    }
    return 'RPG / First person shooter';
  }

  toggleGenre(event: Event, genre: string) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.selectedGenres.push(genre);
      return;
    }
    this.selectedGenres = [...this.selectedGenres.filter((x) => x !== genre)];
  }

  search(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.toLowerCase();
  }

  putItemToCart(game: Game) {
    const item = {
      game,
      price: game.price,
      qty: 1,
    } as OrderItem;
    this.store.dispatch(addItemToOrder({ item }));
  }
}
