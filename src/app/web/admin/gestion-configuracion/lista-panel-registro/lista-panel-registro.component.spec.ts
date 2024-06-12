import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPanelRegistroComponent } from './lista-panel-registro.component';

describe('ListaPanelRegistroComponent', () => {
  let component: ListaPanelRegistroComponent;
  let fixture: ComponentFixture<ListaPanelRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPanelRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPanelRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
