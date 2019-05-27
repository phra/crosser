import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stored1Component } from './stored1.component';

describe('Stored1Component', () => {
  let component: Stored1Component;
  let fixture: ComponentFixture<Stored1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stored1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stored1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
