import { Order, OrderItem, OrderStatus } from '@app/models';
import { Action, createReducer, on } from '@ngrx/store';
import { addItemToOrder, changeQtyOfItem, loadOrderSuccessfully } from '../actions/order.actions';
import { OrderState } from '../app.state';

const defaultOrderState: OrderState = {
  order: {
    status: OrderStatus.created,
    items: [],
  } as Order,
};

const reducerOrderCreator = createReducer(
  defaultOrderState,
  on(loadOrderSuccessfully, (state, { order }) => ({ ...state, order })),
  on(addItemToOrder, (state, { item }) => {
    const order = state.order;
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
  }),
  on(changeQtyOfItem, (state, { id, delta }) => {
    const items: OrderItem[] = [];
    state.order.items.forEach((x) => {
      if (x.game.id === id) {
        if (delta === 0) {
          return;
        }
        const newQty = x.qty + delta;
        items.push({ ...x, qty: newQty <= 0 ? 0 : newQty });
        return;
      }
      items.push(x);
    });
    return { ...state, order: { ...state.order, items } };
  })
);

export function orderReducer(state: OrderState | undefined, action: Action): OrderState {
  return reducerOrderCreator(state, action);
}
