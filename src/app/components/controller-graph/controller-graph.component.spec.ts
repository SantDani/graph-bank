import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerGraphComponent } from './controller-graph.component';

describe('ControllerGraphComponent', () => {
  let component: ControllerGraphComponent;
  let fixture: ComponentFixture<ControllerGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
