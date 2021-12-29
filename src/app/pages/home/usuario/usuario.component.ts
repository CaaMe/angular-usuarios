import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { Observable } from 'rxjs';
import { getTestBed } from '@angular/core/testing';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = new UsuarioModel();

  constructor(private authService: AuthService,
              private router: Router,
              private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if(id !== 'nuevo') {
      this.authService.getUsuario(id)
      .subscribe((resp:  UsuarioModel) => {
        this.usuario = resp;
        this.usuario.id = Number(id);
      })
    }
  }

  guardar(form: NgForm) {

    if(form.invalid) {

      return;
    }

    Swal.fire({
      title: 'Espere',
      text:'Guardando Informacion',
      type:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion : Observable<any>;

    if( this.usuario.id ) {
      peticion = this.authService.actualizarUsuario(this.usuario);
      // .subscribe(resp => {
      //   console.log(resp);
      // });
    } else {
      peticion = this.authService.nuevoUsuario(this.usuario);
      // .subscribe(resp => {
      //   console.log(resp);
      // });
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.usuario.nombre,
        text:'Se Guardando la Informacion',
        type:'success'        
      });
    })

    this.router.navigateByUrl('/home');
    
  }


}
