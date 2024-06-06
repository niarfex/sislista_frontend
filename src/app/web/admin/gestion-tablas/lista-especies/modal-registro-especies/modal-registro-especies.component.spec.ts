import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistroEspeciesComponent } from './modal-registro-especies.component';

describe('ModalRegistroEspeciesComponent', () => {
  let component: ModalRegistroEspeciesComponent;
  let fixture: ComponentFixture<ModalRegistroEspeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistroEspeciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistroEspeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
