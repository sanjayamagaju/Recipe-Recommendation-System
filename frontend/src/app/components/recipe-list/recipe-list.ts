import {Component, OnInit} from '@angular/core';
import {RecipeModel, RecipeResponse} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';
import {RecipeModalService} from '../../services/recipe-modal.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {PAGINATION_SIZES} from '../../utils/constants';


@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  recipes: RecipeModel[] = [];
  searchTerm: string = '';
  selectedDifficulty: string = '';
  vegetarianOnly: boolean = false;

  currentPage = 1;
  totalRecipes = 0;
  hasNextPage = false;
  hasPreviousPage = false;
  totalPages: number = 0;

  pageSizeOptions = PAGINATION_SIZES;
  pageSize = PAGINATION_SIZES[0];

  constructor(
    private _recipeService: RecipeService,
    private _recipeModalService: RecipeModalService,
    private _toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.loadRecipes();
  }

  getPages() {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      return Array.from(
        {length: total},
        (_, index) => index + 1,
      )
    }

    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }

    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [
      1,
      '...',
      current - 1,
      current,
      current + 1,
      '...',
      total
    ];
  }

  goToPage(page: number): void {
    if (page !== this.currentPage) {
      this.loadRecipes(page);
    }
  }

  isPageNumber(page: number | string): page is number {
    return typeof page === 'number';
  }

  openCreateModal(): void {
    const modalRef = this._recipeModalService.openCreate();

    modalRef.content.saved.subscribe(() => {
      this._toastrService.success('Recipe created successfully.', 'Success');
      this.loadRecipes();
    });
  }

  openEditModal(recipeId: number): void {
    const modalRef = this._recipeModalService.openEdit(recipeId);

    modalRef.content.saved.subscribe(() => {
      this._toastrService.success('Recipe updated successfully.', 'Success');
      this.loadRecipes();
    });
  }

  loadRecipes(page: number = 1): void {
    this._recipeService
      .getFilteredRecipes(
        this.searchTerm,
        this.selectedDifficulty,
        this.vegetarianOnly,
        page,
        this.pageSize,
      )
      .subscribe({
        next: (data: RecipeResponse) => {
          this.recipes = data.results;

          this.currentPage = page;
          this.totalRecipes = data.count;
          this.totalPages = Math.ceil(data.count / this.pageSize);

          this.hasNextPage = data.next !== null;
          this.hasPreviousPage = data.previous !== null;
        },
      });
  }

  deleteRecipe(recipe: RecipeModel) {
    const confirmed = confirm(`Delete recipe ${recipe.name}?`);

    if (!confirmed) {
      return;
    }

    this._recipeService.deleteRecipe(recipe.id!).subscribe({
      next: (data) => {
        this._toastrService.success('Recipe deleted successfully.', 'Success');
        this.loadRecipes();
      },
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedDifficulty = '';
    this.vegetarianOnly = false;

    this.loadRecipes();
  }

  onSearch() {
    this.loadRecipes();
  }

  nextPage() {
    if (this.hasNextPage) {
      this.loadRecipes(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.hasPreviousPage) {
      this.loadRecipes(this.currentPage - 1);
    }
  }

  changePageSize() {
    this.loadRecipes(1);
  }
}
