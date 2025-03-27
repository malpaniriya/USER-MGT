
import { Component, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    ToggleButtonModule,
    AvatarModule,
    FormsModule,
    InputTextModule,
    InputIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];

  idFilter:string='';
  nameFilter: string = '';
  emailFilter: string = '';
  avatarFilter: string = '';

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      this.filteredUsers = [...this.users];
      this.cd.detectChanges();
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesName = user.first_name.toLowerCase().includes(this.nameFilter.toLowerCase()) || 
                          user.last_name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesEmail = user.email.toLowerCase().includes(this.emailFilter.toLowerCase());
      const matchesAvatar = user.avatar.toLowerCase().includes(this.avatarFilter.toLowerCase());

      return matchesName && matchesEmail && matchesAvatar;
    });

    this.cd.detectChanges();
  }

  onViewDetails(user: User): void {
    this.router.navigate(['/user-details'], { state: { user } });
  }

  editUser(user: User): void {
    const updatedFirstName = prompt('Edit First Name:', user.first_name) || user.first_name;
    const updatedLastName = prompt('Edit Last Name:', user.last_name) || user.last_name;
    const updatedEmail = prompt('Edit Email:', user.email) || user.email;
    const updatedAvatar = prompt('Edit Avatar URL:', user.avatar) || user.avatar;

    const updatedUser: Partial<User> = {
      first_name: updatedFirstName,
      last_name: updatedLastName,
      email: updatedEmail,
      avatar: updatedAvatar
    };

    this.userService.editUser(user.id, updatedUser).subscribe((editedUser) => {
      const index = this.users.findIndex(u => u.id === editedUser.id);
      if (index > -1) {
        this.users[index] = { ...this.users[index], ...editedUser };
        this.filteredUsers[index] = { ...this.filteredUsers[index], ...editedUser };
      } else {
        this.users.push(editedUser);
        this.filteredUsers.push(editedUser);
      }

      alert(`User ID ${user.id} updated successfully!`);
      this.cd.detectChanges();
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
        this.filteredUsers = this.filteredUsers.filter(user => user.id !== id);
        alert(`User ID ${id} deleted successfully!`);
        this.cd.detectChanges();
      });
    }
  }
}
