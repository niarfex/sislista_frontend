import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaUnoComponent } from './plantilla-uno.component';

describe('PlantillaUnoComponent', () => {
  let component: PlantillaUnoComponent;
  let fixture: ComponentFixture<PlantillaUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantillaUnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantillaUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
