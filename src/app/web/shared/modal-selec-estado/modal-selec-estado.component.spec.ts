import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecEstadoComponent } from './modal-selec-estado.component';

describe('ModalSelecEstadoComponent', () => {
  let component: ModalSelecEstadoComponent;
  let fixture: ComponentFixture<ModalSelecEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSelecEstadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSelecEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
