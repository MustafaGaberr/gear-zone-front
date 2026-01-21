import { Component } from '@angular/core';
import { NavbarComponent } from "../header/navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-auth-layaout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './auth-layaout.html',
  styleUrl: './auth-layaout.css',
})
export class AuthLayaout {

}
