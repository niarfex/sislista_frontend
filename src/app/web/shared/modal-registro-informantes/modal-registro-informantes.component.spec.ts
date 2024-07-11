import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroInformantesComponent } from './modal-registro-informantes.component';

describe('ModalRegistroInformantesComponent', () => {
  let component: ModalRegistroInformantesComponent;
  let fixture: ComponentFixture<ModalRegistroInformantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegistroInformantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegistroInformantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
