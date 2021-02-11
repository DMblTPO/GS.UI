import { Order, OrderItem, OrderStatus } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import { addItemToOrder, loadOrderSuccessfully } from '../actions/order.actions';
import { OrderState } from '../app.state';

const defaultOrderState: OrderState = {
  order: null,
};

const reducerOrderCreator = createReducer(
  defaultOrderState,
  on(loadOrderSuccessfully, (state, { order }) => ({ ...state, order })),
  on(addItemToOrder, (state, { item }) => {
    let order = state.order;
    if (!order) {
      order = {
        status: OrderStatus.created,
        items: [],
      } as Order;
    }
    let isExisted = false;
    const items: OrderItem[] = [];
    order.items.forEach((x) => {
      if (x.game.id === item.game.id) {
        items.push({ ...x, qty: x.qty + item.qty });
        isExisted = true;
        return;
      }
      items.push(x);
    });
    if (!isExisted) {
      items.push(item);
    }
    return { ...state, order: { ...order, items } };
  })
);

export function orderReducer(state: OrderState | undefined, action: Action): OrderState {
  return reducerOrderCreator(state, action);
}
