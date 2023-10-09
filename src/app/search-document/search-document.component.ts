import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '../document-model';

@Component({
  selector: 'app-search-document',
  templateUrl: './search-document.component.html',
  styleUrls: ['./search-document.component.css']
})
export class SearchDocumentComponent implements OnInit{
  isSubMenuOpen = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  // API data
  documents: DocumentModel[] = [];

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:8080/admin';
  
  ngOnInit(): void {
    this.getAllDocuments();
  }
  getAllDocuments() {
    this.http.get<DocumentModel[]>(`${this.apiUrl}/fetchAll`).subscribe(
      (response) => {
        this.documents = response;
        console.log('All documents:', response);
      },
    );
  }

  
  // Form input properties
  docId: string = '';
  processId: string = '';
  subProcessId: string = '';

  searchDocuments() {
    const queryParams = {
      docId: this.docId,
      processId: this.processId,
      subProcessId: this.subProcessId
    };
    console.log('search html:',queryParams);
    this.http.post<any[]>(`${this.apiUrl}/search`, queryParams).subscribe(
      (response) => {
        
        console.log('Search results:', response);
      },
    );
  }

  resetForm() {
    // Clear form inputs and reload all documents
    this.docId = '';
    this.processId = '';
    this.subProcessId = '';
    this.getAllDocuments();
  }
}
