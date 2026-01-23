import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './shared/layout/header/navbar/navbar';
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gear-zone-front');
}
