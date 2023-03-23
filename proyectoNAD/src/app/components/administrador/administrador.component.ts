import { Usuario } from './../../models/Usuario';
import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import { SwitchService } from 'src/app/services/switch.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
   listUsuarios:Usuario[]=[];
   usuarios: Usuario[]=[];
   campo: string = 'nomUsuario';
   orden: number = 1;
   filtro: string = "null";
   valor:string = "";
   modalSwitch:boolean=false;

  constructor(private _adminService: UsuariosService,private modalss:SwitchService) {}
  ngOnInit(): void {
    this.obtenerUsuarios();
     //this.obtenerUsuariosOrdenados();
    //  this._adminService
    //   .getUsuariosOrdenados(this.campo, this.orden,this.filtro,this.valor)
    //   .subscribe((usuarios) => (this.usuarios = usuarios));
    this.modalss.$modal.subscribe((valor)=>{this.modalSwitch = valor})
  }

  closeModal(){
    this.modalss.$modal.emit(false);
    }
  
    openModal(){
      this.modalSwitch = true;
    }

  obtenerUsuarios(){
    this._adminService.getUsuarios().subscribe(data=>{
      console.log(data);
      this.usuarios=data;
    },error=>{
      console.log(error);
    });
  }

  eliminarUsuario(id:any){
    this._adminService.eliminarUsuario(id).subscribe(data =>{
      if (this.filtro =="" && this.valor=="") {
        this.obtenerUsuarios();
      } else {
        this.obtenerUsuariosOrdenados();
      }
     
    },error=>{
console.log(error);
    });
  }
  obtenerUsuariosOrdenados(): void {
    this._adminService
      .getUsuariosOrdenados(this.campo, this.orden,this.filtro,this.valor)
      .subscribe((usuarios) => (this.usuarios = usuarios));
  }

  handleChangeCampo(event: Event): void {
    this.campo = (event.target as HTMLSelectElement).value;
    this.obtenerUsuariosOrdenados();
  }

  handleChangeOrden(event: Event): void {
    this.orden = Number((event.target as HTMLSelectElement).value);
    this.obtenerUsuariosOrdenados();
  }

  handleChangeFiltro(event: Event): void {
    this.filtro = (event.target as HTMLSelectElement).value;
  }
  
  handleChangeInput( valor: string): void {
    this.valor = valor;
    this.obtenerUsuariosOrdenados();
  }

  
  
  
}
