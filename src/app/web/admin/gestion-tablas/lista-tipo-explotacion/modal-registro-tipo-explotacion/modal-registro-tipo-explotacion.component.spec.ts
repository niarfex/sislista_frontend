import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroTipoExplotacionComponent } from './modal-registro-tipo-explotacion.component';

describe('ModalRegistroTipoExplotacionComponent', () => {
  let component: ModalRegistroTipoExplotacionComponent;
  let fixture: ComponentFixture<ModalRegistroTipoExplotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroTipoExplotacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroTipoExplotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
