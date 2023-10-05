import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'first-page',
    component: FirstPageComponent,
  },
  {
    path: 'second-page',
    component: SecondPageComponent,
  },
  {
    path: 'main-page',
    component: MainPageComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./administrator/administrator.module').then(
        (module) => module.AdministratorModule
      ),
  },

  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
