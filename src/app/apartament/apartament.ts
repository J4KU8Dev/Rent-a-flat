import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartamentsService } from '../services/apartaments-service';
import { ApartamentsModel } from '../apartaments.model';
import { email, FormField, form, pattern, required } from '@angular/forms/signals';
import { ContactService } from '../services/contact-service';
import { Subscription } from 'rxjs';

type RegisterModel = {
  message: string,
  name: string,
  email: string,
  phoneNumber: string,
  news: boolean,
  loan: boolean
}

@Component({
  selector: 'app-apartament',
  imports: [FormField],
  templateUrl: './apartament.html',
  styleUrl: './apartament.css',
})
export class Apartament implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  contactService = inject(ContactService);
  apartamentsService = inject(ApartamentsService);
  apartament = signal<ApartamentsModel | undefined>(undefined);
  isShowed:boolean = false;
  dataSubscription: Subscription | undefined;

  ngOnInit(): void {
    const id = signal(this.route.snapshot.params['id']);
    if(!id){
      return;
    }
    this.dataSubscription = this.apartamentsService.getApartamentById(id()).subscribe(data => {
      this.apartament.set(data);
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  onSubmit(event: Event): void{
    event.preventDefault();
    this.contactService.contactAboutApartament(this.signalRegisterModel()).subscribe(
      response => console.log('Message sent successfully.', response),
    )
    // console.log(this.signalRegisterModel())
    this.onResetForm();
  }

  signalRegisterModel = signal<RegisterModel>({
    message: '',
    name: '',
    email: '',
    phoneNumber: '',
    news: false,
    loan: false,
  })

  signalRegisterForm = form(this.signalRegisterModel, (fieldPath) => {
    required(fieldPath.name, {message: 'Name is required'});
    required(fieldPath.message, {message: 'Message is required'});
    pattern(fieldPath.phoneNumber, /^\d{3}-\d{3}-\d{3}$/, {message: 'Phone Number must be in format: 827-284-124'});
    required(fieldPath.phoneNumber, {message: 'Phone Number is required'});
    email(fieldPath.email, {message: 'Enter a valid email'});
    required(fieldPath.email, {message: 'Email is required'});
  });


  onCallBack() {
    this.isShowed = !this.isShowed;
  }

  onSendCallBack(phoneNumber: number) {
    console.log(phoneNumber)
    return phoneNumber;
  }
  onResetForm() {
    this.signalRegisterModel.set({message: '', name: '', email: '', phoneNumber: '', loan: false, news: false});
    this.signalRegisterForm().reset();
  }
}
