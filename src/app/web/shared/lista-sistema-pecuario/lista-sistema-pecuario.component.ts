import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PecuarioGetDto } from 'src/app/models/Pecuario';

@Component({
  standalone: true,
  selector: 'lista-sistema-pecuario',
  templateUrl: './lista-sistema-pecuario.component.html',
  styleUrl: './lista-sistema-pecuario.component.scss',
  imports: [CommonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule]
})
export class ListaSistemaPecuarioComponent {
  @Input() listaPecuarios: PecuarioGetDto[];

  eliminarPecuarios(){
    this.listaPecuarios=this.listaPecuarios.filter(x=>x.Seleccionado==false);
  }

}
