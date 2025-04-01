import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient
  private authState = new BehaviorSubject<any>(null);

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  async submitContactForm(formData: any): Promise<{ success: boolean; message: string }> {
    try {
      // Step 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
  
      if (authError) {
        throw new Error(authError.message);
      }
  
      const userId = authData.user?.id;
      if (!userId) {
        throw new Error("User ID not found after registration");
      }
      console.log("userid is ",userId)
      // Step 2: Insert profile into "profiles" table
      const { data: profileData, error: profileError } = await this.supabase
        .from('profiles')
        .insert([
          {
            id: userId, // Make sure this is allowed as a foreign key
            name: formData.name,
            email: formData.email,
            password:formData.password,
            confirmPassword:formData.confirmPassword
          }
        ]);
  
      if (profileError) {
        throw new Error(profileError.message);
      }
  
      return { success: true, message: "User registered successfully! Redirecting to login..." };
    } catch (error: any) {
      console.error("Registration Error:", error);
      return { success: false, message: error.message };
    }
  }
  async signIn(email: string, password: string): Promise<{ user?: any; error?: any }> {
    if (!email || !password) {
      return { error: "Email et mot de passe requis." };
    }
  
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
  
      if (error) {
        console.error("Erreur de connexion :", error.message);
        return { error };
      }
  
      return { user: data.user }; // Récupérer uniquement l'utilisateur connecté
    } catch (err) {
      console.error("Erreur inattendue :", err);
      return { error: err };
    }
  }
  
  

  
  
  
}