
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class LayoutComponent implements OnInit {
  userName: string = '';  
  userAvatar: string = '';  

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.authService.getLoggedInUser();
    if (user) {
      this.userName = user.name; 
      this.userAvatar = user.avatar;  
    } else {
      this.userName = ' ';  
      this.userAvatar = '';    
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
