import { CommonModule } from '@angular/common';
import { Component, Injector, Input } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { GestionRegistroServiceProxy } from 'src/shared/service-proxies/gestionregistro-proxies';

@Component({
  standalone: true,
  selector: 'modal-cargar-archivo',
  templateUrl: './modal-cargar-archivo.component.html',
  styleUrl: './modal-cargar-archivo.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TableModule,
    FormsModule, ConfirmDialogModule]
})
export class ModalCargarArchivoComponent {
  @Input() exitSubModal = (): void => { };
  @Input() numDoc: String;
  @Input() periodo: String;
  nombreArchivo: String="";
  nombreArchivoFinal: String="";
  peso: number;
  modalForm = this.formBuilder.group({
    file2: new FormControl(null, []),
    InfoAdicional: ['', []]
  });
  private gestionregistroServiceProxy: GestionRegistroServiceProxy;
  constructor(_injector: Injector
    , private formBuilder: FormBuilder
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService) {
    this.gestionregistroServiceProxy = _injector.get(GestionRegistroServiceProxy);
  }
  get InfoAdicional() { return this.modalForm.controls['InfoAdicional']; }
  ngOnInit(): void {

  }
  onClickSubmit(data) {
    const formData = new FormData();
    formData.append('file', this.modalForm.get('file2')?.value,);
    formData.append('numdoc', this.numDoc.toString());
    formData.append('periodo', this.periodo.toString());
    //this.toastr.success("Se subio el archivo correctamente", 'Información');
    //console.log(formData);
    this.gestionregistroServiceProxy.subirArchivo(formData).subscribe(async (res: any) => {
      //this.toastr.success(res.partialText, 'Información');
      if (res.partialText != "" && !(res.partialText === undefined)) {
        this.nombreArchivoFinal = res.partialText;
        this.toastr.success("Se cargó el archivo correctamente", 'Información');
        this.close();
      }
      if (res.status === 200) {
        //console.log(res.partialText);  
        //this.getData();
      }
    },
      (err: any) => {

      });
  }
  close() {
    this.exitSubModal();
  }
  onFocusOutEvent(event: any, nombreControl: string) {
    this.modalForm.controls[nombreControl].setValue(event.target.value.trim().toUpperCase());
  }
  importar($event: any) {
    //this.bArchivoOk = false;
    this.modalForm.patchValue({
      file2: $event.target.files[0]
    })
    //this.saveFile();
    //console.log(this.plantillaForm.get('file')?.value);
    //const formData = new FormData();
    //formData.append('file', this.plantillaForm.get('file')?.value);    
    this.nombreArchivo = this.modalForm.get('file2')?.value.name;
    this.peso = Number.parseFloat((this.modalForm.get('file2')?.value.size / (1000 * 1024)).toFixed(4));
  }
  eliminarArchivo() {
    this.nombreArchivo="";
    this.nombreArchivoFinal="";
    this.peso=null;
    this.InfoAdicional.setValue("");
    this.modalForm.get('file2').setValue(null);
  }
  descargarPlantilla() {

  }
}
