import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReporteUsuariosComponent } from './lista-reporte-usuarios.component';

describe('ListaReporteUsuariosComponent', () => {
  let component: ListaReporteUsuariosComponent;
  let fixture: ComponentFixture<ListaReporteUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaReporteUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaReporteUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
