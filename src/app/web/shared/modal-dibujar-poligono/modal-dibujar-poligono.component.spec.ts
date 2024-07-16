import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDibujarPoligonoComponent } from './modal-dibujar-poligono.component';

describe('ModalDibujarPoligonoComponent', () => {
  let component: ModalDibujarPoligonoComponent;
  let fixture: ComponentFixture<ModalDibujarPoligonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalDibujarPoligonoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDibujarPoligonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
