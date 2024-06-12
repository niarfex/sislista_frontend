import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspeciesComponent } from './lista-especies.component';

describe('ListaEspeciesComponent', () => {
  let component: ListaEspeciesComponent;
  let fixture: ComponentFixture<ListaEspeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaEspeciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEspeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
