import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios : UsuarioModel[] = [];

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    this.getUsuarios();
  }

  salir() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  nuevo() {    
    this.router.navigateByUrl('/usuario/nuevo');
  }

  getUsuarios() {
    this.auth.listUsuarios()
      .subscribe(response => this.usuarios = response );
      //console.log(this.usuarios);
      
  }

  borrarUsuario (usuario: UsuarioModel) {
      this.auth.borrarUsuario(usuario.id.toString())
      .subscribe(response => {
        this.getUsuarios()
      });      
  }

}
