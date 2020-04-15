import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderDashComponent } from './leader-dash.component';

describe('LeaderDashComponent', () => {
  let component: LeaderDashComponent;
  let fixture: ComponentFixture<LeaderDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
