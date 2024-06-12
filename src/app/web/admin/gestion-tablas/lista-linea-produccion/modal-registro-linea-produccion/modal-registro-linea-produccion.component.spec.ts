import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroLineaProduccionComponent } from './modal-registro-linea-produccion.component';

describe('ModalRegistroLineaProduccionComponent', () => {
  let component: ModalRegistroLineaProduccionComponent;
  let fixture: ComponentFixture<ModalRegistroLineaProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroLineaProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroLineaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
