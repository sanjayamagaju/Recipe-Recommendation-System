import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [AsyncPipe],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner implements OnInit {
  loading!: Observable<boolean>;

  constructor(private _spinnerService: SpinnerService) {}

  ngOnInit() {
    this.loading = this._spinnerService.loading$;
  }
}
