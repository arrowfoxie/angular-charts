import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceIpsComponent } from './source-ips.component';

describe('SourceIpsComponent', () => {
  let component: SourceIpsComponent;
  let fixture: ComponentFixture<SourceIpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceIpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
