import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGraphBarComponent } from './custom-graph-bar.component';

describe('CustomGraphBarComponent', () => {
  let component: CustomGraphBarComponent;
  let fixture: ComponentFixture<CustomGraphBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGraphBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGraphBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
