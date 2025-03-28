import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 📌 Importer ReactiveFormsModule


@Component({
  standalone : true ,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] , 
  imports : [CommonModule , RouterModule , ReactiveFormsModule]
})
export class LoginComponent {
  registerForm: FormGroup;
  showPassword: boolean = false;
  registrationSuccess: boolean = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  // Vérification de la correspondance des mots de passe
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  // Basculer l'affichage du mot de passe
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.registerForm.valid) {
      this.registrationSuccess = true;
      this.registerForm.reset();
    }
  }

}
