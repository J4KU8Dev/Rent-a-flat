import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from "./footer/footer";
import { Loader } from "./loader/loader/loader";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RentFlat');
}
