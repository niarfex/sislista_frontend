import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCultivosComponent } from './lista-cultivos.component';

describe('ListaCultivosComponent', () => {
  let component: ListaCultivosComponent;
  let fixture: ComponentFixture<ListaCultivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCultivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCultivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
