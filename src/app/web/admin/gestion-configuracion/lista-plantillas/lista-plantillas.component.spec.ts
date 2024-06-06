import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlantillasComponent } from './lista-plantillas.component';

describe('ListaPlantillasComponent', () => {
  let component: ListaPlantillasComponent;
  let fixture: ComponentFixture<ListaPlantillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPlantillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
