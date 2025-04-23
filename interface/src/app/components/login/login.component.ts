import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  standalone : true ,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] ,
  imports : [CommonModule, ReactiveFormsModule, RouterModule ]
})
export class LoginComponent {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private supabase: SupabaseService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const { user, error } = await this.supabase.signIn(email!, password!);

    if (error) {
      this.errorMessage = error.message;
    } else {
      await this.router.navigate(['/services']);
    }
  }


}
