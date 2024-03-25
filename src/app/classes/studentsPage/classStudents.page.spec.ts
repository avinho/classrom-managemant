import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassStudentsPage } from './classStudents.page';

describe('Tab3Page', () => {
  let component: ClassStudentsPage;
  let fixture: ComponentFixture<ClassStudentsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ClassStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
