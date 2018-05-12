import { ListItem } from './list-item';

export class List {
    id?: string;
    list_name?: string;
    list_items?:  ListItem [];

    constructor(id: string, list_name: string, list_items: ListItem[]){
        this.id = id;
        this.list_name = list_name;
        this.list_items = list_items
    }
}