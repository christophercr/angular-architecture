import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSharedComponent } from './ui-shared.component';

describe('UiSharedComponent', () => {
  let component: UiSharedComponent;
  let fixture: ComponentFixture<UiSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
