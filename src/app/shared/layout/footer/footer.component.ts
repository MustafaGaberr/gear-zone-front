import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';

const GZLogo = 'assets/images/GZ-Logo.png';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  translationService = inject(TranslationService);
  logoImage = GZLogo;
  currentYear = new Date().getFullYear();

  switchLanguage(): void {
    this.translationService.switchLanguage();
  }
}
