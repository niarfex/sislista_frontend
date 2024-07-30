import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarMensajeComponent } from './recuperar-mensaje.component';

describe('RecuperarMensajeComponent', () => {
  let component: RecuperarMensajeComponent;
  let fixture: ComponentFixture<RecuperarMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarMensajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecuperarMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
