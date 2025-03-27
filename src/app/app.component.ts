import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './features/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppComponent {
  title = 'USER-MGT';
}