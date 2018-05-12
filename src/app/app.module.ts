import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { TodoListComponent } from './todo-list/todo-list.component';

import { ListService } from './services/list.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import { AddItemModalComponent } from './helper/add-item-modal/add-item-modal.component';

const routes: Routes = [
  {path: '', component: TodoListComponent},
  {path: 'add-list-item/:id', component: ListItemComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ListItemComponent,
    AddItemModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [ ListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
