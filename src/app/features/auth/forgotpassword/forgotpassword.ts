import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css',
})
export class Forgotpassword {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  public translationService = inject(TranslationService);

  isSubmitting = false;
  isSuccess = false;

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.forgotForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSuccess = true;
        this.toastrService.success(
          this.translationService.currentLang() === 'ar'
            ? 'تم إرسال رابط إعادة التعيين'
            : 'Reset link sent successfully',
          this.translationService.currentLang() === 'ar' ? 'نجاح' : 'Success'
        );
      }, 1500);
    } else {
      this.forgotForm.markAllAsTouched();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}