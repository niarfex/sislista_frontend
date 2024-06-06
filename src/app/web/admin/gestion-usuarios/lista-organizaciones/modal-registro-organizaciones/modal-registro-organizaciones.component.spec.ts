import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroOrganizacionesComponent } from './modal-registro-organizaciones.component';

describe('ModalRegistroOrganizacionesComponent', () => {
  let component: ModalRegistroOrganizacionesComponent;
  let fixture: ComponentFixture<ModalRegistroOrganizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroOrganizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroOrganizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
