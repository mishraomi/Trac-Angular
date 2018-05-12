import { element } from 'protractor';
import { ListItem } from './../models/list-item';
import { List } from './../models/list';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'

@Injectable()
export class ListService {

  listCollection: AngularFirestoreCollection<List>;
  lists: Observable<List[]>;
  listDoc: AngularFirestoreDocument<List>;
  list: List;
  list_item: ListItem;
  listObservable: Observable<List>;
  currentList: List;
  constructor(public afs: AngularFirestore) { 
    this.listCollection = this.afs.collection('lists');
    this.lists = this.listCollection.snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as List;
          data.id = a.payload.doc.id;
          return data;
        });
      });
   }

   getLists(){
      // return this.listCollection.snapshotChanges().map(changes => {
      //   return changes.map(a => {
      //     const data = a.payload.doc.data() as List;
      //     data.id = a.payload.doc.id;
      //     return data;
      //   });
      // });
      return this.lists;
   }

   getListData(id: string){
     this.listDoc = this.afs.doc<List>(`lists/${id}`)
     return this.listDoc.valueChanges();
   }

   addList(list: List){
     this.listCollection.add(list);
   }

   deleteList(list: List){
    this.afs.doc<List>(`lists/${list.id}`).delete();
   }

   getList(){
     return this.list;
   }

   setList(list: List){
     this.list = list;
   }

   getListByName(listName: string): Observable<List> {
    return  this.getLists().map(currentList => currentList.find(listElement => listElement.list_name == listName)) ? this.getLists().map(currentList => currentList.find(listElement => listElement.list_name == listName)) : null;
   }

   addItem(listID: string, itemName: string, itemQuantity: string){
      this.afs.doc(`lists/${listID}`).valueChanges()
      .subscribe(list => {
        this.currentList = list;
        if(this.currentList.list_items == null || this.currentList.list_items.length < 1){
          this.currentList.list_items = [];
        }

        if(itemName.length > 1 && itemQuantity.length > 1){
          this.list_item = { item_name: itemName, item_quantity: itemQuantity }
          this.currentList.list_items.push(this.list_item);
          this.listDoc.update(this.currentList);
          itemName = '';
          itemQuantity = '';
        }
      });
     //this.listDoc.update({list_items: [{item_name: itemName, item_quantity: itemQuantity}]});
      // if (this.list.list_items == null){
      //   this.list.list_items = [];
      // }

      // console.log('listDoc : '+ this.listDoc);
      // this.listDoc.valueChanges().subscribe(list => {
      //   this.currentList = list;
      //   console.log('currentList : '+this.currentList.list_items.length);
      //   if(this.currentList.list_items == null || this.currentList.list_items.length < 1){
      //     this.currentList.list_items = [];
      //   }
      // });
      
      // this.list_item = { item_name: itemName, item_quantity: itemQuantity }
      // this.currentList.list_items.push(this.list_item);
      // this.listDoc.update(this.currentList);

      //this.list_item = { item_name: itemName, item_quantity: itemQuantity }
      //this.list.list_items.push(this.list_item)
      //this.listDoc.update(this.list);
   }
}
