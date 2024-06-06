import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroUsuariosComponent } from './modal-registro-usuarios.component';

describe('ModalRegistroUsuariosComponent', () => {
  let component: ModalRegistroUsuariosComponent;
  let fixture: ComponentFixture<ModalRegistroUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroUsuariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
