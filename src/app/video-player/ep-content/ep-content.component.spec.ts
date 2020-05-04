import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpContentComponent } from './ep-content.component';

describe('EpContentComponent', () => {
  let component: EpContentComponent;
  let fixture: ComponentFixture<EpContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
