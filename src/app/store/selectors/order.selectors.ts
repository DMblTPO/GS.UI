import { createSelector } from '@ngrx/store';
import { featureGameStoreStateStor } from '../app.state';

export const orderStor = createSelector(
  featureGameStoreStateStor,
  (state) => state.currentOrder.order
);

export const orderItemsStor = createSelector(orderStor, (order) => order.items);

export const orderItemsQtyStor = createSelector(orderStor, (order) => order.items.length);

export const orderTotalStor = createSelector(orderStor, (order) =>
  order.items.map((i) => i.price * i.qty).reduce((a, b) => a + b, 0)
);
