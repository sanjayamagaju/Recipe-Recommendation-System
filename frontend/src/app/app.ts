import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './shared/navbar/navbar';
import { Spinner } from './shared/spinner/spinner';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Spinner],
  templateUrl: './app.html'
})
export class App {
}
