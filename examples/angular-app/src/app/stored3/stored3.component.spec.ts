import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Stored3Component } from './stored3.component';

describe('Stored3Component', () => {
  let component: Stored3Component;
  let fixture: ComponentFixture<Stored3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Stored3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Stored3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
