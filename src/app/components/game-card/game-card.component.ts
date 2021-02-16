import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, OrderItem } from '@app/models';
import { addItemToOrder, gameStor, GameStoreState } from '@app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  game$: Observable<Game>;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<GameStoreState>
  ) {}
  ngOnInit(): void {
    const gameId = +this.route.snapshot.params.id;
    this.game$ = this.store.select(gameStor, { id: gameId });
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
