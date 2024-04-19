import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonPopover,
  IonIcon,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Student } from 'src/app/models';
import { StudentDataComponent } from '../student-data/student-data.component';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonTitle,
    IonIcon,
    IonPopover,
    IonButton,
    IonButtons,
    IonBackButton,
    IonToolbar,
    IonHeader,
    CommonModule,
    StudentDataComponent,
  ],
})
export class StudentProfileComponent implements OnInit {
  @Output() closeModal = new EventEmitter(false);
  @Output() deleteStudent = new EventEmitter(false);
  @Input() student?: Student;

  constructor() {}

  ngOnInit() {
    return;
  }

  onCloseModal() {
    this.closeModal.emit(false);
  }

  onDeleteStudent(data: Student) {
    this.deleteStudent.emit(data);
    this.onCloseModal();
  }
}
