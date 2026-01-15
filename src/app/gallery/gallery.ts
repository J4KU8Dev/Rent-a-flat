import { Component, inject, signal } from '@angular/core';
import { images } from '../services/gallery-images';
import { imagesInterface } from '../images.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  public images = signal<imagesInterface[]>([...images]);
}
