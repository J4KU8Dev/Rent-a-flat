import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartamentsStorage } from '../apartaments-storage';
import { ApartamentsModel } from '../apartaments.model';
import { email, Field, form, required } from '@angular/forms/signals';
type RegisterModel = {
  message: string,
  name: string,
  email: string,
  phoneNumber: number,
  news: boolean,
  loan: boolean
}

@Component({
  selector: 'app-apartament',
  imports: [Field],
  templateUrl: './apartament.html',
  styleUrl: './apartament.css',
})
export class Apartament implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  apartamentsStorage = inject(ApartamentsStorage);
  apartament = signal<ApartamentsModel | undefined>(undefined);
  
  // permisions = [
  //   {id: 1, title: 'news'},
  //   {id: 2, title: 'loan'},
  // ]

  ngOnInit(): void {
    const id = signal(this.route.snapshot.params['id']);
    this.apartament.set(this.apartamentsStorage.getApartamentById(id()));
  }

  onSubmit(event: Event): void{
    event.preventDefault();
    console.log(this.signalRegisterModel())
    this.signalRegisterModel.set({message: '', name: '', email: '', phoneNumber: 0, loan: false, news: false});
    this.signalRegisterForm().reset;
  }

  signalRegisterModel = signal<RegisterModel>({
    message: '',
    name: '',
    email: '',
    phoneNumber: 0,
    news: false,
    loan: false,
  })

  // add validation
  signalRegisterForm = form(this.signalRegisterModel, (fieldPath)=>{
    required(fieldPath.name, {message: 'Name is required'});
    required(fieldPath.message, {message: 'Message is required'});
    required(fieldPath.phoneNumber, {message: 'Phone Number is required'});
    email(fieldPath.email, {message: 'Enter a valid email'});
    required(fieldPath.email, {message: 'Email is required'});
  });

}
