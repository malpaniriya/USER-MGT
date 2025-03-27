
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://reqres.in/api/login';
  private usersUrl = 'https://reqres.in/api/users/2';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(this.loginUrl, { email, password }).pipe(
      switchMap((loginResponse) => {
        const userId = email === 'eve.holt@reqres.in' ? 4 : 2;
        return this.http.get(`${this.usersUrl}/${userId}`).pipe(
          tap((userResponse: any) => {
            if (loginResponse.token) {
              localStorage.setItem('authToken', loginResponse.token);

              const user = {
                name: `${userResponse.data.first_name} ${userResponse.data.last_name}`,
                email: userResponse.data.email,
                avatar: userResponse.data.avatar
              };
              localStorage.setItem('loggedInUser', JSON.stringify(user));  
            }
          })
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
  }

  getLoggedInUser(): any {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
}
