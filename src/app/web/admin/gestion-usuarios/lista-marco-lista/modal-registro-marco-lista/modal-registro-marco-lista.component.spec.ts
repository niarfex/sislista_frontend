import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroMarcoListaComponent } from './modal-registro-marco-lista.component';

describe('ModalRegistroMarcoListaComponent', () => {
  let component: ModalRegistroMarcoListaComponent;
  let fixture: ComponentFixture<ModalRegistroMarcoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroMarcoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroMarcoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
