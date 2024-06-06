import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteMapaComponent } from './reporte-mapa.component';

describe('ReporteMapaComponent', () => {
  let component: ReporteMapaComponent;
  let fixture: ComponentFixture<ReporteMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
