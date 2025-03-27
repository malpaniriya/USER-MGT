
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../domain/models/user';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, CardModule, ButtonModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User = { id: 0, first_name: '', last_name: '', email: '', avatar: '' };

  constructor(private router: Router) {}

  ngOnInit(): void {
  
    const userFromState = history.state.user;
    if (userFromState) {
      this.user = userFromState;
    } else {
      console.error('No user data found in state');
    }
  }

  onCancel(): void {
    this.router.navigate(['/user-list']);  
  }
}