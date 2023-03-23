// import { Empresa } from './../models/Empresa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = 'http://localhost:4000/api/Rol/';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any>{
    return this.http.get(this.url);
  }
}

