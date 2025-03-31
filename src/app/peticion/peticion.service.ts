import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Peticion } from './peticion';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  private apiUrl = 'http://127.0.0.1:8000/api/peticiones'; 

  constructor(private http: HttpClient) {}

  createPeticion(peticionData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post<any>(this.apiUrl, peticionData, { headers });
  }
  getPeticiones(): Observable<{ peticiones: Peticion[] }> {
    return this.http.get<{ peticiones: Peticion[] }>(this.apiUrl);
  }
  getPeticion(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);

  }
}