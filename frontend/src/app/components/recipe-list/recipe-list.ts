import {Component, OnInit} from '@angular/core';
import {RecipeModel} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {RecipeModalService} from '../../services/recipe-modal.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-recipe-list',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  recipes: RecipeModel[] = [];
  filteredRecipes: RecipeModel[] = [];
  searchTerm: string = '';
  selectedDifficulty: string = '';
  vegetarianOnly: boolean = false;

  constructor(
    private _recipeService: RecipeService,
    private _recipeModalService: RecipeModalService,
  ) {
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  openCreateModal(): void {
    const modalRef = this._recipeModalService.openCreate();

    modalRef.content.saved.subscribe(() => {
      this.loadRecipes();
    })
  }

  openEditModal(recipeId: number): void {
    const modalRef = this._recipeModalService.openEdit(recipeId);

    modalRef.content.saved.subscribe(() => {
      this.loadRecipes()
    })
  }

  loadRecipes(): void {
    this._recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.getFilteredRecipes();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteRecipe(recipe: RecipeModel) {
    const confirmed = confirm(`Delete recipe ${recipe.name}?`);

    if (!confirmed) {
      return;
    }

    this._recipeService.deleteRecipe(recipe.id!).subscribe({
      next: (data) => {
        this.loadRecipes();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getFilteredRecipes() {
    this.filteredRecipes = this.recipes.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDifficulty = !this.selectedDifficulty || item.difficulty === this.selectedDifficulty;
      const matchesVegetarian = !this.vegetarianOnly || item.is_vegetarian;

      return matchesSearch && matchesDifficulty && matchesVegetarian;
    })
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDifficulty = '';
    this.vegetarianOnly = false;

    this.filteredRecipes = this.recipes;
  }
}
