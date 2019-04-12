import { Component, Input, OnInit } from '@angular/core';
import { ObjectDetailsService } from '../../../../pmm-api-services/services/object-details.service';

@Component({
  selector: 'app-details-examples',
  templateUrl: './details-examples.component.html',
  styleUrls: ['./details-examples.component.css']
})
export class DetailsExamplesComponent implements OnInit {
  @Input() params: any;

  constructor(protected objectDetailsService: ObjectDetailsService) {

  }

  ngOnInit() {
    this.objectDetailsService.GetQueryExample(this.params).subscribe(console.log);
  }

}
