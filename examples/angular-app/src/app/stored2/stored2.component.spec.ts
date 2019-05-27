import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stored2Component } from './stored2.component';

describe('Stored2Component', () => {
  let component: Stored2Component;
  let fixture: ComponentFixture<Stored2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stored2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stored2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
