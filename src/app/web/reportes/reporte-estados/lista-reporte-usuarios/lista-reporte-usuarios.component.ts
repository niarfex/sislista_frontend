import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'lista-reporte-usuarios',
  templateUrl: './lista-reporte-usuarios.component.html',
  styleUrl: './lista-reporte-usuarios.component.scss'
})
export class ListaReporteUsuariosComponent implements OnInit {
  
  constructor(private confirmationService: ConfirmationService    
  ) {
  }
  ngOnInit(): void {
  }
}
