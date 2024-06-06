import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMarcoListaComponent } from './lista-marco-lista.component';

describe('ListaMarcoListaComponent', () => {
  let component: ListaMarcoListaComponent;
  let fixture: ComponentFixture<ListaMarcoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaMarcoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMarcoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
