import { List } from './../../models/list';
import { ListService } from './../../services/list.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  list: List = {id: '', list_name: '', list_items: []};
  listID: string;
  constructor(private listService: ListService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this.listID = this.route.snapshot.paramMap.get('id');
    return this.listService.getListData(this.listID).subscribe(data => this.list = data)
  }

}
