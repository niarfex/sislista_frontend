import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { Login } from 'src/app/models/login';
import { ReporteGetDto } from 'src/app/models/Reporte';
import { LoginService } from 'src/auth/services/login.service';
import { ReporteServiceProxy } from 'src/shared/service-proxies/reporte-proxies';

@Component({
  selector: 'reporte-estados',
  templateUrl: './reporte-estados.component.html',
  styleUrls: ['./reporte-estados.component.scss'],
  providers: [ConfirmationService],
  encapsulation : ViewEncapsulation.None
})
export class ReporteEstadosComponent implements OnInit {

  usuario:Login; 
  reporte: ReporteGetDto = new ReporteGetDto();
  private reporteServiceProxy: ReporteServiceProxy;
  constructor(_injector: Injector
    , private confirmationService: ConfirmationService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private loginService: LoginService) { 
      this.reporteServiceProxy = _injector.get(ReporteServiceProxy);
    }

  ngOnInit(): void {
    this.usuario=this.loginService.getCurrentUserValue;
    this.getData();
  }

  getData(event?: LazyLoadEvent) {
    this.spinner.show();
    this.reporteServiceProxy.getAll()
      .pipe(finalize(() => setTimeout(() => this.spinner.hide(), 1000)))
      .subscribe({
        next: (result) => {
          if (result.success) {
            this.reporte=result.datos;
            console.log(result);
            //this.lista_resultados = result.datos
          }
        }
      });
  }

}
