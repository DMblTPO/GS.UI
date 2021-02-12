import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from '@app/models';
import {
  changeQtyOfItem,
  GameStoreState,
  orderItemsStor,
  orderStor,
  orderTotalStor,
} from '@app/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  order$: Observable<Order>;
  orderItems$: Observable<OrderItem[]>;
  orderTotal$: Observable<number>;

  constructor(private readonly store: Store<GameStoreState>) {}

  ngOnInit(): void {
    this.order$ = this.store.select(orderStor);
    this.orderItems$ = this.store.select(orderItemsStor);
    this.orderTotal$ = this.store.select(orderTotalStor);
  }

  increase(id: number) {
    this.store.dispatch(changeQtyOfItem({ id, delta: 1 }));
  }

  decrease(id: number) {
    this.store.dispatch(changeQtyOfItem({ id, delta: -1 }));
  }

  clear(id: number) {
    this.store.dispatch(changeQtyOfItem({ id, delta: 0 }));
  }
}
