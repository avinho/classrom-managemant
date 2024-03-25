import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsPage } from './students.page';

describe('Tab2Page', () => {
  let component: StudentsPage;
  let fixture: ComponentFixture<StudentsPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(StudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
