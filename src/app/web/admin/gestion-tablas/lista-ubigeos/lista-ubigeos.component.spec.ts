import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUbigeosComponent } from './lista-ubigeos.component';

describe('ListaUbigeosComponent', () => {
  let component: ListaUbigeosComponent;
  let fixture: ComponentFixture<ListaUbigeosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaUbigeosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaUbigeosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
