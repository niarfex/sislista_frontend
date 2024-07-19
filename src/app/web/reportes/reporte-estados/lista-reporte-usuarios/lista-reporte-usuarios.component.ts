import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Login } from 'src/app/models/login';
import { ReporteUsuarioListDto } from 'src/app/models/Reporte';
import { LoginService } from 'src/auth/services/login.service';


@Component({
  selector: 'lista-reporte-usuarios',
  templateUrl: './lista-reporte-usuarios.component.html',
  styleUrl: './lista-reporte-usuarios.component.scss'
})
export class ListaReporteUsuariosComponent implements OnInit {
  @Input() listaUsuarios: ReporteUsuarioListDto[];
  usuario:Login; 
  constructor(private confirmationService: ConfirmationService 
    ,private loginService: LoginService   
  ) {
  }
  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
  }
}
