import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGestionRegistroComponent } from './lista-gestion-registro.component';

describe('ListaGestionRegistroComponent', () => {
  let component: ListaGestionRegistroComponent;
  let fixture: ComponentFixture<ListaGestionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGestionRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGestionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
