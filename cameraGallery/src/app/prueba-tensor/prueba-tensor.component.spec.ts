import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaTensorComponent } from './prueba-tensor.component';

describe('PruebaTensorComponent', () => {
  let component: PruebaTensorComponent;
  let fixture: ComponentFixture<PruebaTensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebaTensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaTensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
