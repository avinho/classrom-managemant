import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'classes',
        loadComponent: () =>
          import('../pages/classes/classes.page').then((m) => m.ClassesPage),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('../pages/students/students.page').then((m) => m.StudentsPage),
      },
      {
        path: 'books',
        loadComponent: () =>
          import('../pages/books/books.page').then((m) => m.BooksPage),
      },
      {
        path: '',
        redirectTo: '/tabs/classes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/classes',
    pathMatch: 'full',
  },
];
