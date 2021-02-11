import { Injectable } from '@angular/core';
import { OrdersService } from '@app/services/orders.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { loadOrderSuccessfully, startLoadingOrder } from '../actions/order.actions';

@Injectable()
export class OrderEffects {
  loadOrder$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startLoadingOrder),
        switchMap(() => {
          return this.orderService.getLastCreatedOrder();
        }),
        map((order) => loadOrderSuccessfully({ order }))
      ),
    { dispatch: true }
  );

  constructor(private actions$: Actions, private readonly orderService: OrdersService) {}
}
