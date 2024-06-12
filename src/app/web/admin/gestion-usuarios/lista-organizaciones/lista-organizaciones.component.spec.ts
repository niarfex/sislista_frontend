import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOrganizacionesComponent } from './lista-organizaciones.component';

describe('ListaOrganizacionesComponent', () => {
  let component: ListaOrganizacionesComponent;
  let fixture: ComponentFixture<ListaOrganizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaOrganizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
