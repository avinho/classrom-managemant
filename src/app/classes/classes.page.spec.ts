import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesPage } from './classes.page';

describe('Tab1Page', () => {
  let component: ClassesPage;
  let fixture: ComponentFixture<ClassesPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
