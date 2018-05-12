import { ListService } from './../../services/list.service';
import {Component, ViewEncapsulation, Input} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'list-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class AddItemModalComponent {

  @Input() listID;
  closeResult: string;
  itemName: string = '';
  itemQuantity: string = '';

  modalReference: NgbModalRef;

  constructor(private modalService: NgbModal, private listService: ListService) {
    this.itemName = '';
    this.itemQuantity = '';
  }

  openVerticallyCentered(content) {
    this.itemName = '';
    this.itemQuantity = '';
    this.modalReference = this.modalService.open(content, { centered: true });
  }

  addItem(){
    if ( this.itemName.trim() != '' && this.itemQuantity.trim() != '' ){
      this.listService.addItem(this.listID, this.itemName, this.itemQuantity);
      this.modalReference.close();
    } 
  }
}