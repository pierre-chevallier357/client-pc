import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameWarningComponent } from './end-game-warning.component';

describe('EndGameWarningComponent', () => {
  let component: EndGameWarningComponent;
  let fixture: ComponentFixture<EndGameWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndGameWarningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
