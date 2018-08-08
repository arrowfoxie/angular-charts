import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVmsComponent } from './mobile-vms.component';

describe('MobileVmsComponent', () => {
  let component: MobileVmsComponent;
  let fixture: ComponentFixture<MobileVmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileVmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
