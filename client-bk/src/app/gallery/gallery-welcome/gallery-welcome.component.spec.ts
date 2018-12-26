import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryWelcomeComponent } from './gallery-welcome.component';

describe('GalleryWelcomeComponent', () => {
  let component: GalleryWelcomeComponent;
  let fixture: ComponentFixture<GalleryWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
