
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-create-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, CardModule],
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent {   
  userForm: FormGroup;
  avatar: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  
  onImageSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatar = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

 
  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: Partial<User> = {
        ...this.userForm.value,
        avatar: this.avatar || 'https://via.placeholder.com/150'  
      };

      this.userService.saveUser(newUser).subscribe((createdUser) => {
        console.log('User created:', createdUser); 
        this.router.navigate(['/user-list']);
      });
    }
  }


  onCancel(): void {
    this.router.navigate(['/user-list']);   
  }
}
