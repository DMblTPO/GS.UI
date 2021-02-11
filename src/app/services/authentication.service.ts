import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private url = '/api/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<User>(`${this.url}/authenticate`, {
      username,
      password,
    });
  }
}
