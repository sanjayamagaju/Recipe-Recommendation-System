import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RecipeService} from '../../services/recipe.service';
import {IngredientModel} from '../../models/recipe';
import {RecipeModalService} from '../../services/recipe-modal.service';
import {BsModalRef} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.css',
})
export class RecipeForm implements OnInit {
  recipeForm!: FormGroup;
  ingredients: IngredientModel[] = [];
  selectedIngredientIds: number[] = [];

  @Input() recipeId?: number;
  @Output() saved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private _recipeService: RecipeService,
    private _recipeModalService: RecipeModalService,
    private _modalRef: BsModalRef,
  ) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      cooking_time: [0, [Validators.required, Validators.min(1)]],
      difficulty: ['', Validators.required],
      is_vegetarian: [false],
    })
  }

  get ctrl() {
    return this.recipeForm.controls;
  }

  ngOnInit() {
    this.loadIngredients();

    if (this.recipeId) {
      this.loadRecipe();
    }
  }

  loadRecipe(): void {
    this._recipeService.getRecipe(this.recipeId!).subscribe({
      next: (res) => {
        this.recipeForm.patchValue({
          name: res.name,
          description: res.description,
          cooking_time: res.cooking_time,
          difficulty: res.difficulty,
          is_vegetarian: res.is_vegetarian
        });

        this.selectedIngredientIds =
          res.ingredients.map(item => item.id);
      }
    });
  }

  loadIngredients() {
    this._recipeService.getIngredients().subscribe({
      next: res => {
        this.ingredients = res;
      }
    })
  }

  onSubmit() {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    if (this.selectedIngredientIds.length === 0) {
      return;
    }

    const recipeData = {
      ...this.recipeForm.getRawValue(),
      ingredient_ids: this.selectedIngredientIds,
    };

    const request = this.recipeId ? this._recipeService.updateRecipe(this.recipeId, recipeData) : this._recipeService.createRecipe(recipeData);

    request.subscribe({
      next: () => {
        this.saved.emit();
        this._modalRef.hide();
      }
    })
  }


  toggleIngredient(id: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selectedIngredientIds.push(id);
    } else {
      this.selectedIngredientIds = this.selectedIngredientIds.filter(ingredientId => ingredientId !== id);
    }
  }

  cancel(): void {
    this._modalRef.hide();
  }
}
