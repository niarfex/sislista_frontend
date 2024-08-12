import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapaGisComponent } from './modal-mapa-gis.component';

describe('ModalMapaGisComponent', () => {
  let component: ModalMapaGisComponent;
  let fixture: ComponentFixture<ModalMapaGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMapaGisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalMapaGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
