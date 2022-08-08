import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAggregateBanksComponent } from './custom-aggregate-banks.component';

describe('CustomAggregateBanksComponent', () => {
  let component: CustomAggregateBanksComponent;
  let fixture: ComponentFixture<CustomAggregateBanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAggregateBanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAggregateBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
