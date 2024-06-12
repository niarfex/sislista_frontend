import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgramacionRegistroComponent } from './modal-programacion-registro.component';

describe('ModalProgramacionRegistroComponent', () => {
  let component: ModalProgramacionRegistroComponent;
  let fixture: ComponentFixture<ModalProgramacionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProgramacionRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgramacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
