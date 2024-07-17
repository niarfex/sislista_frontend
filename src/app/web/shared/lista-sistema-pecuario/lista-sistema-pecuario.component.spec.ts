import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSistemaPecuarioComponent } from './lista-sistema-pecuario.component';

describe('ListaSistemaPecuarioComponent', () => {
  let component: ListaSistemaPecuarioComponent;
  let fixture: ComponentFixture<ListaSistemaPecuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaSistemaPecuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaSistemaPecuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
