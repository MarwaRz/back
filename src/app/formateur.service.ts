import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Formateur} from './formateur'
@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private baseUrl = 'http://localhost:9090/formateur';

  constructor(private http: HttpClient) { }

  getFormateur(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }



  public getAllFormateurs(pageNumber, searchKeyword: string= ""){
    return this.http.get<Formateur[]>("http://localhost:9090/getAllFormateurs?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }
  createForamteur(formateur: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, formateur);
  }

  updateFormateur(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteFormateur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getFormateurList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
