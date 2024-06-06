import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroCultivoComponent } from './modal-registro-cultivo.component';

describe('ModalRegistroCultivoComponent', () => {
  let component: ModalRegistroCultivoComponent;
  let fixture: ComponentFixture<ModalRegistroCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroCultivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
