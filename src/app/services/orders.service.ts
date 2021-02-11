import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from '@app/models/Order';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private url = '/api/orders';
  constructor(private http: HttpClient) {}
  getLastCreatedOrder() {
    return this.http.get(`${this.url}/last-created`) as Observable<Order>;
  }
  addItem(id: number, item: OrderItem) {
    return this.http.post(`${this.url}/${id}/items`, { item }) as Observable<OrderItem>;
  }
}
