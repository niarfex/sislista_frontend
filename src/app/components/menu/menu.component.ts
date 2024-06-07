import { Component, Injector, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { LoginService } from 'src/auth/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ConfirmationService]
})
export class MenuComponent implements OnInit {

  constructor(_injector: Injector,private loginService: LoginService,private toastr: ToastrService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }
  logout(){    
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas cerrar sesión?',
      header: 'Cerrar Sesión',
      icon: 'none',      
      acceptButtonStyleClass: "botonAceptar",
      rejectButtonStyleClass: "botonCancelar",
      acceptLabel: "Si, estoy seguro",
      rejectLabel: "Cancelar",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {   
        this.loginService.logout();    
            
      },
      reject: () => {
        this.toastr.error('Ha cerrado sesión exitosamente','Error');  
        
      }
    });
  }
}
