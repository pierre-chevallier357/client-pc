import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStrategyComponent } from './select-strategy.component';

describe('SelectStrategyComponent', () => {
  let component: SelectStrategyComponent;
  let fixture: ComponentFixture<SelectStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStrategyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
