import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTipoExplotacionComponent } from './lista-tipo-explotacion.component';

describe('ListaTipoExplotacionComponent', () => {
  let component: ListaTipoExplotacionComponent;
  let fixture: ComponentFixture<ListaTipoExplotacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTipoExplotacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTipoExplotacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
