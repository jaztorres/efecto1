import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollyImagesComponent } from './scrolly-images.component';

describe('ScrollyImagesComponent', () => {
  let component: ScrollyImagesComponent;
  let fixture: ComponentFixture<ScrollyImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollyImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollyImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
