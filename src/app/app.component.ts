import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NumberListComponent } from './components/number-list/number-list.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['../styles/theme.css'],
  imports: [HeaderComponent, NavbarComponent, NumberListComponent,HttpClientModule],
})
export class AppComponent {}
