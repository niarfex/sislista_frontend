import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConsultaElementosComponent } from './modal-consulta-elementos.component';

describe('ModalConsultaElementosComponent', () => {
  let component: ModalConsultaElementosComponent;
  let fixture: ComponentFixture<ModalConsultaElementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConsultaElementosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalConsultaElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
