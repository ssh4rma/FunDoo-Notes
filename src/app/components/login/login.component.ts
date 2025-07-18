import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;
  matcher = new ErrorStateMatcher();
  user: UserService;
  spinner = false;

  constructor(user: UserService, private router: Router) {
    this.user = user;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  get isDisabled(): boolean {
    return this.loginForm.invalid;
  }

  onLogin() {
    // console.log('Triggered');
    if (this.loginForm.valid) {
      this.user
        .login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.id);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched();
    }
  }

  goToSignup() {
    this.router.navigate(['/register']);
  }
}
