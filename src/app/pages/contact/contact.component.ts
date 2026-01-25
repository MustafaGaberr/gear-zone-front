import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslationService } from '../../core/services/translation.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
    translationService = inject(TranslationService);

    contactForm = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    };

    isSubmitting = false;
    submitSuccess = false;
    submitError = false;

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.isSubmitting = true;
            this.submitError = false;

            // Simulate API call
            setTimeout(() => {
                this.isSubmitting = false;
                this.submitSuccess = true;
                this.resetForm(form);

                // Hide success message after 5 seconds
                setTimeout(() => {
                    this.submitSuccess = false;
                }, 5000);
            }, 1500);
        }
    }

    resetForm(form: NgForm) {
        form.resetForm();
        this.contactForm = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        };
    }
}
