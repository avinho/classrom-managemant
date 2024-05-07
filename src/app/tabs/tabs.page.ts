import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  add,
  addCircleOutline,
  arrowBack,
  arrowBackOutline,
  arrowUndoSharp,
  book,
  readerOutline,
  calendarClear,
  calendarNumber,
  checkmarkDone,
  checkmarkDoneSharp,
  close,
  create,
  listOutline,
  pencil,
  people,
  person,
  personAdd,
  personCircle,
  pin,
  refresh,
  school,
  search,
  trash,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({
      search,
      addCircleOutline,
      calendarClear,
      personCircle,
      checkmarkDone,
      readerOutline,
      checkmarkDoneSharp,
      pencil,
      create,
      arrowBack,
      arrowUndoSharp,
      calendarNumber,
      person,
      personAdd,
      people,
      school,
      book,
      add,
      trash,
      close,
      pin,
      refresh,
      listOutline,
      arrowBackOutline,
    });
  }
}
