import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCondicionJuridicaComponent } from './lista-condicion-juridica.component';

describe('ListaCondicionJuridicaComponent', () => {
  let component: ListaCondicionJuridicaComponent;
  let fixture: ComponentFixture<ListaCondicionJuridicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCondicionJuridicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCondicionJuridicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
