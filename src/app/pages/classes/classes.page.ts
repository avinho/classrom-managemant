import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSpinner,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ClassStudentsComponent } from '../../components/class-students/class-students.component';
import { Book, Class, Student } from '../../models';
import { ClassService } from './../../services/class.service';
import { StudentService } from './../../services/student.service';

@Component({
  selector: 'app-classes',
  templateUrl: 'classes.page.html',
  styleUrls: ['classes.page.scss'],
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent,
    IonButtons,
    IonInput,
    IonSpinner,
    IonButton,
    IonModal,
    IonFabButton,
    IonFab,
    IonCol,
    IonRow,
    IonGrid,
    IonNote,
    IonIcon,
    IonAvatar,
    IonList,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    CommonModule,
    ClassStudentsComponent,
  ],
})
export class ClassesPage {
  private readonly classService = inject(ClassService);
  private readonly studentService = inject(StudentService);
  classes?: Class[];
  students?: Student[];
  books?: Book[];

  constructor() {
    this.loadClasses();
  }

  async loadClasses() {
    this.classes = await this.classService.loadClasses();
  }

  handleRefresh(event: any) {
    setTimeout(async () => {
      await this.loadClasses();
      event.target.complete();
    }, 1000);
  }

  closeModal(modal: IonModal) {
    modal.dismiss();
  }

  async deleteClass(classItem: Class) {
    console.log('classItem', classItem);
    await this.classService.delete(classItem);
    await this.loadClasses();
  }

  async onAddClass(name: any, modal?: IonModal) {
    if (!name) return;
    const newClass: Class = {
      name: name,
      students: [],
    };
    await this.classService.save(newClass);
    await this.loadClasses();
    modal?.dismiss();
  }

  async loadStudents(classId: number) {
    return await this.studentService.loadStudentsByClassId(classId);
  }
}
