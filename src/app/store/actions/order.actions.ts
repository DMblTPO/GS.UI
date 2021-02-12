import { Order, OrderItem } from '@app/models';
import { createAction, props } from '@ngrx/store';

export enum OrderActions {
  StartLoading = '[OrderActions] Start loading',
  LoadSuccessfully = '[OrderActions] Load successfully',
  AddItem = '[OrderActions] Add item',
  ChangeQty = '[OrderActions] Change qty of item',
}

export const startLoadingOrder = createAction(OrderActions.StartLoading);

export const loadOrderSuccessfully = createAction(
  OrderActions.LoadSuccessfully,
  props<{ order: Order }>()
);

export const addItemToOrder = createAction(OrderActions.AddItem, props<{ item: OrderItem }>());

export const changeQtyOfItem = createAction(
  OrderActions.ChangeQty,
  props<{ id: number; delta: number }>()
);
