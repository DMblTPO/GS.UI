import { createSelector } from '@ngrx/store';
import { featureGameStoreStateStor } from '../app.state';

export const orderStor = createSelector(
  featureGameStoreStateStor,
  (state) => state.currentOrder.order
);

export const orderItemsQtyStor = createSelector(orderStor, (order) =>
  order ? order.items.length : 0
);
