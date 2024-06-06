import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroUbigeoComponent } from './modal-registro-ubigeo.component';

describe('ModalRegistroUbigeoComponent', () => {
  let component: ModalRegistroUbigeoComponent;
  let fixture: ComponentFixture<ModalRegistroUbigeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroUbigeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroUbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
