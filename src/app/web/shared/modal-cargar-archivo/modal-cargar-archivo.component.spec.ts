import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCargarArchivoComponent } from './modal-cargar-archivo.component';

describe('ModalCargarArchivoComponent', () => {
  let component: ModalCargarArchivoComponent;
  let fixture: ComponentFixture<ModalCargarArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCargarArchivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCargarArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
