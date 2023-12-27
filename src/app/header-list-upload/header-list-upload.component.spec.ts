import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderListUploadComponent } from './header-list-upload.component';

describe('HeaderListUploadComponent', () => {
  let component: HeaderListUploadComponent;
  let fixture: ComponentFixture<HeaderListUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderListUploadComponent]
    });
    fixture = TestBed.createComponent(HeaderListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
