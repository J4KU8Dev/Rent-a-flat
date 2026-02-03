import { Component, inject, OnInit, signal } from '@angular/core';
import { imagesInterface } from '../images.model';
import { RouterLink } from "@angular/router";
import { GalleryService } from '../services/gallery-service';

@Component({
  selector: 'app-gallery',
  imports: [RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery implements OnInit {
  protected galleryService = inject(GalleryService);
  images = signal<imagesInterface[]>([]);

  ngOnInit(): void {
    this.galleryService.getAllImages().subscribe(data => {
      this.images.set(data);
    })  
  }
}
