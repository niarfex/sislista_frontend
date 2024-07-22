import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroObservacionComponent } from './modal-registro-observacion.component';

describe('ModalRegistroObservacionComponent', () => {
  let component: ModalRegistroObservacionComponent;
  let fixture: ComponentFixture<ModalRegistroObservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalRegistroObservacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalRegistroObservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
