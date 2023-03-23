// import { Empresa } from './../models/Empresa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url = 'http://localhost:4000/api/Empresa/';

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<any>{
    return this.http.get(this.url);
  }
}

