import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild('f') slform:NgForm;
  subscription:Subscription;
  editMode : boolean = false;
  editItemIndex :number;
  toeditingredient :Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode = true;
        this.editItemIndex = index;
        this.toeditingredient = this.slService.toEditIngredient(this.editItemIndex);
        this.slform.setValue({
          name:this.toeditingredient.name,amount:this.toeditingredient.amount
        });

      }
    )
  }

  onAddItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }
  onDelete(){
    this.slService.DeleteIngredient(this.editItemIndex);
    this.onClear();
  }
  onClear(){
    this.slform.reset();
    this.editMode=false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
