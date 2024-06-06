import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroPlantillaComponent } from './modal-registro-plantilla.component';

describe('ModalRegistroPlantillaComponent', () => {
  let component: ModalRegistroPlantillaComponent;
  let fixture: ComponentFixture<ModalRegistroPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
