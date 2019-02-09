import { Component, OnInit } from '@angular/core';
import {Recipe} from '../recipe.model'

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
recipes: Recipe[] = [new Recipe("R101","Very tasty :)","https://is2-ssl.mzstatic.com/image/thumb/Video3/v4/15/ce/68/15ce6822-0991-be76-7385-82b6ea9187ce/pr_source.lsr/268x0w.png"),
new Recipe("R101","Very tasty :)","https://is2-ssl.mzstatic.com/image/thumb/Video3/v4/15/ce/68/15ce6822-0991-be76-7385-82b6ea9187ce/pr_source.lsr/268x0w.png")]
  constructor() { }
  
  ngOnInit() {
  }

}
