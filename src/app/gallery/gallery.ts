import { Component, inject, signal } from '@angular/core';
import { images } from '../gallery-images';
import { imagesInterface } from '../images.model';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  public images = signal<imagesInterface[]>([...images]);
}
