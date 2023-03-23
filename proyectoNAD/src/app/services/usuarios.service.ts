import { Usuario } from './../models/Usuario';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = 'http://localhost:4000/api/Usuario/';
  urlLogin = 'http://localhost:4000/api/Usuario/login';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(this.url, { headers });
  }

  // Método para eliminar un usuario
  eliminarUsuario(id:string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.delete(this.url +  id, { headers });
  }

  // Método para crear un usuario
  crearUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(this.url, usuario);
  }

  // Método para obtener un usuario por ID
  getUsuario(id:string):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.get(this.url + id, { headers });
  }

  // Método para editar un usuario
  editarUsuario(id:string, usuario:Usuario):Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.http.put(this.url + id, usuario, { headers });
  }

  // Método para obtener los usuarios ordenados
  getUsuariosOrdenados(campo: string, orden: number, filtro:string, valor:string): Observable<Usuario[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    const params = new HttpParams()
      .set('campo', campo)
      .set('orden', orden)
      .set('filtro', filtro)
      .set('valor', valor);
    return this.http.get<Usuario[]>(this.url, { headers, params });
  }  

  logearUsuario(email:string, contrasena:string):Observable<any>{
    return this.http.post(this.urlLogin, {email,contrasena});
  }
}
