import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMapaGeneralComponent } from './reporte-mapa-general.component';

describe('ReporteMapaGeneralComponent', () => {
  let component: ReporteMapaGeneralComponent;
  let fixture: ComponentFixture<ReporteMapaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReporteMapaGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReporteMapaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
