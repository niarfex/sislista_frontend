import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroNotificacionesComponent } from './modal-registro-notificaciones.component';

describe('ModalRegistroNotificacionesComponent', () => {
  let component: ModalRegistroNotificacionesComponent;
  let fixture: ComponentFixture<ModalRegistroNotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroNotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
