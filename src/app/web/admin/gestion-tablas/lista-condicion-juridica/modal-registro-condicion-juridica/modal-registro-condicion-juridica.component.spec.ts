import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroCondicionJuridicaComponent } from './modal-registro-condicion-juridica.component';

describe('ModalRegistroCondicionJuridicaComponent', () => {
  let component: ModalRegistroCondicionJuridicaComponent;
  let fixture: ComponentFixture<ModalRegistroCondicionJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroCondicionJuridicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroCondicionJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
