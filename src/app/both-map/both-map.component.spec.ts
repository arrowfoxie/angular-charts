import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BothMapComponent } from './both-map.component';

describe('BothMapComponent', () => {
  let component: BothMapComponent;
  let fixture: ComponentFixture<BothMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BothMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BothMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
