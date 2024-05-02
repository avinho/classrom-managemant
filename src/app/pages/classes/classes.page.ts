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
  IonRow,
  IonSpinner,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonRefresherContent,
  IonRefresher,
} from '@ionic/angular/standalone';
import { Book, Class, Student } from '../../models';
import { StorageService } from '../../services/_storagee.service';
import { ClassStudentsComponent } from '../../components/class-students/class-students.component';
import { ClassesRepository } from 'src/app/services/repositories/classes.repository.service';
import { StudentsRepository } from 'src/app/services/repositories/students.repository.service';

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
  private readonly classRepository = inject(ClassesRepository);
  private readonly studentRepository = inject(StudentsRepository);
  classes?: Class[];
  students?: Student[];
  books?: Book[];

  constructor() {
    this.loadClasses();
  }

  async loadClasses() {
    this.classes = await this.classRepository.getClasses();
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
    const index = this.classes?.indexOf(classItem);
    if (index !== undefined) {
      this.classes?.splice(index, 1);
      await this.classRepository.addClass(classItem.name);
    }
  }

  async onAddClass(name: any, modal?: IonModal) {
    if (!name) return;
    const newClass: Class = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      students: [],
    };
    this.classes?.push(newClass);
    await this.classRepository.addClass(newClass.name);
    modal?.dismiss();
  }

  async loadStudents(classId: number) {
    return (await this.studentRepository.getStudents()).filter((student) => {
      return student.class!.id === classId;
    });
  }

  async loadBooks() {
    //this.books = await this.storage.loadBooks();
  }
}
