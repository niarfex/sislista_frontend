import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInformantesComponent } from './lista-informantes.component';

describe('ListaInformantesComponent', () => {
  let component: ListaInformantesComponent;
  let fixture: ComponentFixture<ListaInformantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaInformantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaInformantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
