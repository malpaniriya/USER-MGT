import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,  
    InputTextModule,  
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  ngOnInit(): void {
   this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    if (this.loginForm.valid) {
      console.log("Login Successful:", this.loginForm.value);
      this.router.navigateByUrl('/dashboard'); 
    } else {
      console.log("Invalid Form Submission");
    }
  }
}