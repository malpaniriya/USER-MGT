import { Observable } from 'rxjs';
import { User } from '../models/user';

export interface UserRepository {
  getUsers(): Observable<User[]>;
  getUserById(id: number): Observable<User>;
  createUser(user: User): Observable<User>;
  updateUser(user: User): Observable<User>;
  deleteUser(id: number): Observable<void>;
}
