export class ListItem {
    item_name?: string;
    item_quantity?: string;

    constructor(item_name: string, item_quantity: string){
        this.item_name = item_name;
        this.item_quantity = item_quantity;
    }
}