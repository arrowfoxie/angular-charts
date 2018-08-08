import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileIpsComponent } from './mobile-ips.component';

describe('MobileIpsComponent', () => {
  let component: MobileIpsComponent;
  let fixture: ComponentFixture<MobileIpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileIpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
