import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm:FormGroup;

  constructor(private route: ActivatedRoute , private recipeservice:RecipeService,
                private router :Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.onInitForm();
        }
      );
  }
  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name':new FormControl(),
        'amount':new FormControl()
      })
    )
  }
  deleteIngredient(i:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
  onSubmit(){
    if(this.editMode){
      this.recipeservice.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeservice.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onCancel(){
    this.router.navigate(['../']);
  }
  private onInitForm(){
    let recipeName="";
    let recipeImagePath="";
    let recipeDescription="";
    let recipeIngredient= new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeservice.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          recipeIngredient.push(new FormGroup({
            'name':new FormControl(ingredient.name),
            'amount':new FormControl(ingredient.amount)
          }))
        }
      }
    }
    
    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName),
      'imagePath':new FormControl(recipeImagePath),
      'description':new FormControl(recipeDescription),
      'ingredients': recipeIngredient
    })

  }
}
