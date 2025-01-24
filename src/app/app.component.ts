import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import { HomeComponent } from './Home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SellerService } from './sellerservice/seller.service';
import {  OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
 
    HomeComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    
    
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {

  title = "Medicare";

  
  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    // Ensure the code runs only in the browser
    if (isPlatformBrowser(this.platformId)) {
      // Check if dark mode is enabled from localStorage
      if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
      }
    }
  }

  toggleDarkMode(): void {
    if (isPlatformBrowser(this.platformId)) {
      const isDarkModeEnabled = document.body.classList.toggle('dark-mode');
  
      // Save the preference in localStorage
      if (isDarkModeEnabled) {
        localStorage.setItem('dark-mode', 'enabled');
      } else {
        localStorage.removeItem('dark-mode');
      }
    }
  }

  
}
