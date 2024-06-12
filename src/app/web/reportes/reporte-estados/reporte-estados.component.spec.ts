import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteEstadosComponent } from './reporte-estados.component';

describe('ReporteEstadosComponent', () => {
  let component: ReporteEstadosComponent;
  let fixture: ComponentFixture<ReporteEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteEstadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
