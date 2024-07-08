import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFundoPlantillaComponent } from './registro-fundo-plantilla.component';

describe('RegistroFundoPlantillaComponent', () => {
  let component: RegistroFundoPlantillaComponent;
  let fixture: ComponentFixture<RegistroFundoPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroFundoPlantillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroFundoPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
