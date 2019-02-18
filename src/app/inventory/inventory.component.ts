import { Component, OnInit } from '@angular/core';
import { BaseService } from '../inventory-api/base-service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private baseService: BaseService) { }

  ngOnInit() {
  }

}
