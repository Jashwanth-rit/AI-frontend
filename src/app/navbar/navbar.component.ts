import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from '../sellerservice/seller.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { Product } from '../datatype';
import { ActivatedRoute } from '@angular/router';  // Corrected ActivatedRoute import
import { AnyPtrRecord } from 'dns';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgbModule, FormsModule],  // Removed ActivatedRoute and NgModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menutype: string = 'default';
  sellername: string = '';
  userlogin = true;
  username: string = '';
  searchQuery: string = '';  // Variable to hold search input
  cartlength: any;
  searchResults: any[] = [];  // To hold search results

  constructor(private router: Router, private seller: SellerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
  }
  
}
