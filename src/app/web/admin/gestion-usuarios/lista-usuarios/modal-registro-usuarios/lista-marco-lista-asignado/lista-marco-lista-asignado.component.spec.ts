import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMarcoListaAsignadoComponent } from './lista-marco-lista-asignado.component';

describe('ListaMarcoListaAsignadoComponent', () => {
  let component: ListaMarcoListaAsignadoComponent;
  let fixture: ComponentFixture<ListaMarcoListaAsignadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaMarcoListaAsignadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaMarcoListaAsignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
