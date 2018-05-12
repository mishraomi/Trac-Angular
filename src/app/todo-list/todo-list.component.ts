import { Observable } from 'rxjs/Observable';
import { ListItem } from './../models/list-item';
import { List } from './../models/list';
import { ListService } from './../services/list.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  lists: List[];
  searchList: List;
  public isAddNew: boolean;
  newList: List = {
    list_name: ''
  }

  allLists: Observable<List[]>;
  constructor(private listService: ListService) { }

  ngOnInit() {
    console.log("TodoListComponent Inside ngOnInit");
    this.isAddNew = false;
    this.allLists = this.listService.getLists();
  }

  showAddNew(){
    this.newList = {id: '', list_name: '', list_items: []};
    this.isAddNew = true;
  }

  hideAddNew(){
    this.isAddNew = false;
  }

  addNewList(){
    this.newList.list_items = [];
    this.listService.addList(this.newList);
    this.isAddNew = false;
    // this.allLists
    // .map(lists => lists.filter(list => list.list_name === this.newList.list_name))
    // .subscribe(list => {
    //   if(list.length > 0){
    //     console.log('List already exists');
    //   }
    //   else {
    //     this.newList.list_items = [];
    //     this.listService.addList(this.newList);
    //     this.isAddNew = false;
    //   }
    // });
  }

  deleteList(list: List){
    this.listService.deleteList(list);
  }

  findList(searchList: string){
    this.searchList = this.lists.find(currentList => currentList.list_name == searchList);
    if (this.searchList){
      return true;
    }
    else {
      return false;
    }
  }

}
