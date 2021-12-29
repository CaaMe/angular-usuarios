import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlAuth = 'http://localhost:8001/auth';
  private url = 'http://localhost:8001/api';

  username: string;
  
  constructor( private http: HttpClient ) {
    
  }


  logout() {
    localStorage.removeItem('username');
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario
    };

    return this.http.post(
      `${ this.urlAuth }/login`,
      authData
    ).pipe(
      map( resp => {
        this.guardarUser( resp['username'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const Data = {
      ...usuario
    };

    return this.http.post(
      `${ this.url }/usuarios`,
      Data
    ).pipe(
      map( resp => {
        this.guardarUser( resp['username'] );
        return resp;
      })
    );
  }

  actualizarUsuario( usuario: UsuarioModel ) {

    const Data = {
      ...usuario
    };

    return this.http.put(
      `${ this.url }/usuarios/${ usuario.id }`,
      Data
    ).pipe(
      map( resp => {
        this.guardarUser( resp['username'] );
        return resp;
      })
    );
  }

  listUsuarios() {

    return this.http.get(
      `${ this.url }/usuarios`
    ).pipe(
      map( this.crearArreglo )
    );
  }

  getUsuario(id: string) {

    return this.http.get(
      `${ this.url }/usuarios/${ id }`
    );
  }

  borrarUsuario(id: string) {

    return this.http.delete(
      `${ this.url }/usuarios/${ id }`
    );
  }

  private crearArreglo(usersObj: object) {

    const usuarios : UsuarioModel[] = [];
    if(usersObj === null) { return [];}

    Object.keys(usersObj).forEach( key => {
      const usuario : UsuarioModel = usersObj[key];      
      usuarios.push(usuario);
    });
    //console.log(usuarios)
    return usuarios;
  }

  private guardarUser( username: string ) {

    this.username = username;
    localStorage.setItem('username', username);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );
  }
}
