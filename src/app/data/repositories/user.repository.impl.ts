import { Injectable } from '@angular/core';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models/user';
import { Observable } from 'rxjs';
import { UserApiDataSource } from '../data-sources/user-api.datasource';

@Injectable({
  providedIn: 'root',
})
export class UserRepositoryImpl implements UserRepository {
  constructor(private userApiDataSource: UserApiDataSource) {}

  getUsers(): Observable<User[]> {
    return this.userApiDataSource.getUsers();
  }

  getUserById(id: number): Observable<User> {
    return this.userApiDataSource.getUserById(id);
  }

  createUser(user: User): Observable<User> {
    return this.userApiDataSource.createUser(user);
  }

  updateUser(user: User): Observable<User> {
    return this.userApiDataSource.updateUser(user);
  }

  deleteUser(id: number): Observable<void> {
    return this.userApiDataSource.deleteUser(id);
  }
}
