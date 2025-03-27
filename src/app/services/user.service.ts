
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private localUsers: User[] = [];
  private nextId: number = 1;

  constructor(private http: HttpClient, private router: Router) {
    this.initializeNextId();
  }

  private initializeNextId(): void {
    this.getUsers().subscribe((response) => {
      const apiUsers = response.data;
      const allUsers = [...apiUsers, ...this.localUsers];
      const maxId = allUsers.reduce((max, user) => Math.max(max, user.id), 0);
      this.nextId = maxId + 1;
    });
  }

  
  getUsers(): Observable<{ data: User[] }> {
    return this.http.get<{ data: User[] }>(this.apiUrl).pipe(
      tap((response) => {
        response.data = [...response.data, ...this.localUsers];
      })
    );
  }

  
  addLocalUser(user: User): void {
    user.id = this.nextId++;
    this.localUsers.push(user);
  }

  
  addUser(newUser: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser);
  }

  
  saveUser(newUser: Partial<User>): Observable<User> {
    return this.addUser(newUser).pipe(
      tap((createdUser) => {
        this.addLocalUser({ ...createdUser, id: this.nextId });
        alert('User created successfully!');
      })
    );
  }

  
  // editUser(userId: number, updatedUser: Partial<User>): Observable<User> {
  //   const url = `${this.apiUrl}/${userId}`;

  //   const localUserIndex = this.localUsers.findIndex(u => u.id === userId);

  //   if (localUserIndex > -1) {
  //     this.localUsers[localUserIndex] = { ...this.localUsers[localUserIndex], ...updatedUser };
  //     alert(`Local User ID ${userId} updated successfully!`);
  //     return of(this.localUsers[localUserIndex]);
  //   }

  
  //   return this.http.put<User>(url, updatedUser).pipe(
  //     tap((updatedApiUser) => {
        
  //       const apiUserIndex = this.localUsers.findIndex(u => u.id === userId);
  //       if (apiUserIndex > -1) {
  //         this.localUsers[apiUserIndex] = { ...this.localUsers[apiUserIndex], ...updatedApiUser };
  //       } else {
          
  //         this.localUsers.push(updatedApiUser);
  //       }
  //     })
  //   );
  // }
  editUser(userId: number, updatedUser: Partial<User>): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
  
    const localUserIndex = this.localUsers.findIndex(u => u.id === userId);
  
    if (localUserIndex > -1) {
      
      this.localUsers[localUserIndex] = { ...this.localUsers[localUserIndex], ...updatedUser };
      alert(`Local User ID ${userId} updated successfully!`);
      return of(this.localUsers[localUserIndex]);
    }
  
    return this.http.put<User>(url, updatedUser).pipe(
      tap((updatedApiUser) => {
      
        updatedApiUser.id = userId;  
  
        const apiUserIndex = this.localUsers.findIndex(u => u.id === userId);
        if (apiUserIndex > -1) {
          this.localUsers[apiUserIndex] = { ...this.localUsers[apiUserIndex], ...updatedApiUser };
        } else {
         
          if (!this.localUsers.some(u => u.id === userId)) {
            this.localUsers.push(updatedApiUser);
          }
        }
      })
    );
  }
  

  
  deleteUser(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    this.localUsers = this.localUsers.filter((user) => user.id !== id);
    return this.http.delete<void>(deleteUrl);
  }
}
