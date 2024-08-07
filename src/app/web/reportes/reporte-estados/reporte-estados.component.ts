import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { Login } from 'src/app/models/login';
import { FlujoValidacionListDto, ReporteGetDto } from 'src/app/models/Reporte';
import { LoginService } from 'src/auth/services/login.service';
import { ReporteServiceProxy } from 'src/shared/service-proxies/reporte-proxies';

@Component({
  selector: 'reporte-estados',
  templateUrl: './reporte-estados.component.html',
  styleUrls: ['./reporte-estados.component.scss'],
  providers: [ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class ReporteEstadosComponent implements OnInit {

  usuario: Login;
  verTodosAdm: boolean = false;
  reporte: ReporteGetDto = new ReporteGetDto();
  listaSuperior: FlujoValidacionListDto[] = [];
  data: any;
  options: any;
  private reporteServiceProxy: ReporteServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private loginService: LoginService) {
    this.reporteServiceProxy = _injector.get(ReporteServiceProxy);
  }

  ngOnInit(): void {
    this.usuario = this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.reporteServiceProxy.getAll()
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.reporte = result.datos;
            this.generarDona();
            for (var i = 0; i < 3; i++) {
              this.listaSuperior.push(this.reporte.ListFlujoValidacion[i]);
            }

            //console.log(result);
            //this.lista_resultados = result.datos
          }
        }
      });
  }
  verTodosSuperiorAdm() {
    this.listaSuperior = this.reporte.ListFlujoValidacion;
    this.verTodosAdm = true;
  }
  verMenosSuperiorAdm() {
    this.listaSuperior = []
    for (var i = 0; i < 3; i++) {
      this.listaSuperior.push(this.reporte.ListFlujoValidacion[i]);
    }
    this.verTodosAdm = false;
  }
  generarDona() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');



    this.data = {
      labels: ['Completadas', 'En progreso', 'No iniciadas'],
      datasets: [
        {
          data: [this.reporte.CantCompletados, this.reporte.CantEnProgreso, this.reporte.CantNoIniciado],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          
        }
      ]
    };

    this.options = {
      cutout: '70%',
      plugins: {        
        legend: {
          labels: {
            color: textColor
          },
          position: 'bottom'
        }
      }
    };
  }
}
