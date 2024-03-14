import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginUser } from '../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = '';
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      pwd: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  login() {
    const user: LoginUser = {
      email: this.Email.value,
      password: this.PWD.value,
    };

    this.authService.login(user).subscribe({
      next: (response) => {
        console.log(response);
        this.message = 'Login Successfully';
        this.authService.storeToken(response.token);
        this.loginForm.reset();
      },
      error: (err) => {
        console.error('Authentication failed', err);
        this.message = 'Invalid Credentials!';
      }
    })
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
