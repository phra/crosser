import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VulnComponent } from './vuln.component';

describe('VulnComponent', () => {
  let component: VulnComponent;
  let fixture: ComponentFixture<VulnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VulnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VulnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
