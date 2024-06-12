import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCamposPlantillaComponent } from './lista-campos-plantilla.component';

describe('ListaCamposPlantillaComponent', () => {
  let component: ListaCamposPlantillaComponent;
  let fixture: ComponentFixture<ListaCamposPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCamposPlantillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCamposPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
