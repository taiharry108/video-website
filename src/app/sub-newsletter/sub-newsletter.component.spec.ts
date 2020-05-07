import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNewsletterComponent } from './sub-newsletter.component';

describe('SubNewsletterComponent', () => {
  let component: SubNewsletterComponent;
  let fixture: ComponentFixture<SubNewsletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubNewsletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
