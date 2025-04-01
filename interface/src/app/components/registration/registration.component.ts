import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule , provideRouter} from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // Fixed imports placement
})
export class RegistrationComponent implements OnInit {

  registerForm!: FormGroup;
  showPassword = false;
  registrationSuccess = false;
  isLoading = false;
  
  // Add these error handling properties
  errorMessage: string = '';  // Initialize as empty string
  formSubmitted = false;      // Track if form has been submitted

  constructor(
    private formBuilder: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  
  // Vérifie que les mots de passe correspondent
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
    this.registrationSuccess = false;
  
    try {
      const formData = this.registerForm.value;
      const result = await this.supabase.submitContactForm(formData);
  
      if (result.success) {
        this.registrationSuccess = true;
        this.registerForm.reset();
  
        // Show success message & redirect to login page
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        throw new Error(result.message);
      }
  
    } catch (error: any) {
      console.error('Erreur capturée:', error);
      this.errorMessage = error.message || "Une erreur inconnue s'est produite.";
    } finally {
      this.isLoading = false;
    }
  }
  
  
  
  private getErrorMessage(error: any): string {
    if (error.message.includes('User already registered')) {
      return 'Cet email est déjà utilisé.';
    } else if (error.message.includes('Password should be at least')) {
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    } else if (error.message.includes('Invalid email')) {
      return 'Email invalide.';
    } else if (error.message.includes('Échec de la création du profil')) {
      return 'Problème de création du profil. Contactez l\'administrateur.';
    } else {
      return 'Erreur lors de l\'inscription: ' + (error.message || 'Veuillez réessayer');
    }
  }
}