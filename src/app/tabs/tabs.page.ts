import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  arrowBack,
  arrowBackOutline,
  arrowUndoSharp,
  book,
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
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({
      search,
      calendarClear,
      personCircle,
      checkmarkDone,
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
