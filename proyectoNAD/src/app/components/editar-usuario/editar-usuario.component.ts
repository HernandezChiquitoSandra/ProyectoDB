import { EmpresaService } from './../../services/empresa.service';
import { Rol } from './../../models/Rol';
import { Empresa } from './../../models/Empresa';
import { UsuariosService } from './../../services/usuarios.service';
import { RolService } from './../../services/rol.service';
import { UsuarioEstandar } from '../../models/UsuarioEstandar';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  listRoles: Rol[] = [];
  listEmpresas: Empresa[] = [];
  usuarioForm: FormGroup;
  id: string | null;
  constructor(private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuariosService,
    private aRouter: ActivatedRoute,
    private _rolService: RolService,
    private _empresaService: EmpresaService) {
    this.usuarioForm = this.fb.group({
      nombreUsuario: ['', Validators.required],
      apePaterno: ['', Validators.required],
      apeMaterno: ['', Validators.required],
      //email: ['', Validators.email],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      rol: ['', Validators.required],
      empresa: ['', Validators.required],
      // status:['',Validators.required],
      //contrasena: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.ediatrUsuario();
    this.obtenerRoles();
    this.obtenerEmpresas();
  }

  crearCuenta() {
    // console.log(this.usuarioForm);

    // console.log(this.usuarioForm.get('producto')?.value);

    const USUARIO: UsuarioEstandar = {
      nombreUsuario: this.usuarioForm.get('nombreUsuario')?.value,
      apePaterno: this.usuarioForm.get('apePaterno')?.value,
      apeMaterno: this.usuarioForm.get('apeMaterno')?.value,
      //email: this.usuarioForm.get('email')?.value,
      edad: this.usuarioForm.get('edad')?.value,
      genero: this.usuarioForm.get('genero')?.value,
      rol: this.usuarioForm.get('rol')?.value,
      empresa: this.usuarioForm.get('empresa')?.value,
      // status : this.usuarioForm.get('status')?.value,
      // contrasena: this.usuarioForm.get('contrasena')?.value,
    }

    if (this.id !== null) {
      this._usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
        this.router.navigate(['/user', this.id]);
      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      });
      // } else {
      //   console.log(USUARIO);
      //   this._usuarioService.crearUsuario(USUARIO).subscribe(data => {
      //     window.location.reload();
      //   }, error => {
      //     console.log(error);
      //     this.usuarioForm.reset();
      //   });
      // }
    }
  }

  ediatrUsuario() {
    if (this.id !== null) {
      this._usuarioService.getUsuario(this.id).subscribe(data => {
        this.usuarioForm.setValue({
          nombreUsuario: data.nombreUsuario,
          apePaterno: data.apePaterno,
          apeMaterno: data.apeMaterno,
          //email: data.email,
          edad: data.edad,
          genero: data.genero,
          rol: data.rol,
          empresa: data.empresa,
          // status : this.usuarioForm.get('status')?.value,
          //contrasena: data.contrasena,
        })
      });
    }
  }

  obtenerRoles() {
    this._rolService.getRoles().subscribe(data => {
      console.log(data);
      this.listRoles = data;
    }, error => {
      console.log(error);
    });
  }

  obtenerEmpresas() {
    this._empresaService.getEmpresas().subscribe(data => {
      console.log(data);
      this.listEmpresas = data;
    }, error => {
      console.log(error);
    });
  }

}
