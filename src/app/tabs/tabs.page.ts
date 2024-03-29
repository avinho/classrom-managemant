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
  book,
  calendarNumber,
  calendarClear,
  checkmarkDone,
  checkmarkDoneSharp,
  create,
  pencil,
  people,
  person,
  personCircle,
  arrowBack,
  school,
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
      calendarClear,
      personCircle,
      checkmarkDone,
      checkmarkDoneSharp,
      pencil,
      create,
      arrowBack,
      calendarNumber,
      person,
      people,
      school,
      book,
      add,
    });
  }
}
