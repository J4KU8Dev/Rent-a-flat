import { Injectable } from '@angular/core';
import { attractionsModel } from './attractions.model';

@Injectable({
  providedIn: 'root',
})
export class AttractionsStorage {
  public attractions: attractionsModel[] = [
    {
      id: "t1",
      text: "No child needs any encouragement to play outside. Our playground is the perfect place for it.",
      img: "/assets/images/attractions/1.jpg",
    },
    {
      id: "t2",
      text: "Enjoy relaxing walks surrounded by greenery in the nearby city park, perfect for families and couples.",
      img: "/assets/images/attractions/2.jpg",
    },
    {
      id: "t3",
      text: "Discover local cafes and restaurants offering traditional cuisine just a few minutes away.",
      img: "/assets/images/attractions/3.jpg",
    },
    {
      id: "t4",
      text: "Spend your time actively with access to bicycle paths and outdoor fitness areas.",
      img: "/assets/images/attractions/4.jpg",
    },
    {
      id: "t5",
      text: "Explore historical landmarks and charming streets located close to the apartments.",
      img: "/assets/images/attractions/5.jpg",
    },
    {
      id: "t6",
      text: "Enjoy peaceful moments by the river with scenic views and relaxing surroundings.",
      img: "/assets/images/attractions/6.jpg",
    },
  ]
}
