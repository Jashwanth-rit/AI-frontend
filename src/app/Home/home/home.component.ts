import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../../sellerservice/seller.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {  Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';



import { NgForm } from '@angular/forms';  // Import NgForm

import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  constructor(private seller: SellerService,private router : Router,private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object,  private config: NgbCarouselConfig ) {  




}
}
