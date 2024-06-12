import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLineaProduccionComponent } from './lista-linea-produccion.component';

describe('ListaLineaProduccionComponent', () => {
  let component: ListaLineaProduccionComponent;
  let fixture: ComponentFixture<ListaLineaProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLineaProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaLineaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
