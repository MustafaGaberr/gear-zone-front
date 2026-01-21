import { Component } from '@angular/core';
import { NavbarComponent } from "../header/navbar/navbar";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-blanck-layout',
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './blanck-layout.html',
  styleUrl: './blanck-layout.css',
})
export class BlanckLayout {

}
