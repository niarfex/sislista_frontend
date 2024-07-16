import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMetodoInsercionComponent } from './modal-metodo-insercion.component';

describe('ModalMetodoInsercionComponent', () => {
  let component: ModalMetodoInsercionComponent;
  let fixture: ComponentFixture<ModalMetodoInsercionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMetodoInsercionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalMetodoInsercionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
