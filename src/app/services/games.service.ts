import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable({ providedIn: 'root' })
export class GamesService {
  private url = '/api/games';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get(this.url) as Observable<Game[]>;
  }

  getGame(id: number) {
    return this.http.get(`${this.url}/${id}`) as Observable<Game>;
  }
}
