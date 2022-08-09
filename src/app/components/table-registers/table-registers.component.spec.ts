import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRegistersComponent } from './table-registers.component';

describe('TableRegistersComponent', () => {
  let component: TableRegistersComponent;
  let fixture: ComponentFixture<TableRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRegistersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
