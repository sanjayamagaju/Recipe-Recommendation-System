import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {RecipeForm} from '../components/recipe-form/recipe-form';

@Injectable({
  providedIn: 'root',
})
export class RecipeModalService {

  constructor(
    private _modalService: BsModalService,
  ) {
  }

  openCreate(): BsModalRef {
    return this._modalService.show(RecipeForm, {
      class: 'modal-lg'
    });
  }

  openEdit(recipeId: number): BsModalRef {
    return this._modalService.show(RecipeForm, {
      class: 'modal-lg',
      initialState: {
        recipeId
      }
    })
  }
}
