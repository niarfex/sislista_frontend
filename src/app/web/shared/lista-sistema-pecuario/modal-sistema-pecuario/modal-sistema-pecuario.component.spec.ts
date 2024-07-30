import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSistemaPecuarioComponent } from './modal-sistema-pecuario.component';

describe('ModalSistemaPecuarioComponent', () => {
  let component: ModalSistemaPecuarioComponent;
  let fixture: ComponentFixture<ModalSistemaPecuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSistemaPecuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSistemaPecuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
