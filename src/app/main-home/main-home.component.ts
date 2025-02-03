import { Component } from '@angular/core';
import { SellerService } from '../sellerservice/seller.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-home',
  standalone: true,
  imports: [NgbModule,CommonModule,FormsModule],
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.css'
})
export class MainHomeComponent {

  query: string = '';
  file: File | null = null;
  results: any[] = [];
  errorMessage: string = '';
  searchQuery: string = '';

  constructor(private backendService: SellerService,private http: HttpClient) {}


  

  llmResponse: string = '';
 

  onSearch() {
    if (this.searchQuery.trim()) {
      this.http.post<any>('http://localhost:6600/api/search', { query: this.searchQuery })
        .subscribe(
          (response) => {
            // Capture both search results and LLM response
            this.results = response.searchResults;  // This is the actual search results
            console.log('Search Results:', this.results);  // Log the actual search results for reference
            this.llmResponse = response.llmResponse;  // This is the LLM response
            console.log('LLM Response:', this.llmResponse);  // Log LLM response for reference
  
            this.errorMessage = '';
          },
          (error) => {
            this.errorMessage = 'An error occurred during the search';
            this.results = [];
            this.llmResponse = '';  // Clear LLM response in case of error
          }
        );
    }
  }

  animateLLMResponse(responseText: string) {
    let i = 0;
    const element = document.querySelector('.llm-response p');
    
    if (element) {
      element.textContent = ''; // Clear text before animation
  
      const interval = setInterval(() => {
        element.textContent += responseText.charAt(i);
        i++;
        if (i >= responseText.length) {
          clearInterval(interval); // Stop when the full text is displayed
        }
      }, 50);  // 50ms delay for letter-by-letter display
    }
  }
  


  // Method to format attendees as a string
  formatAttendees(attendees: any[]): string {
    return attendees.map(att => att.name).join(', ');
  }
  

}
