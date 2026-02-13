import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApartamentsService } from '../services/apartaments-service';
import { ApartamentsModel } from '../apartaments.model';
import { email, FormField, form, pattern, required } from '@angular/forms/signals';
import { ContactService } from '../services/contact-service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PopUp } from '../pop-up/pop-up';

type contact = {
  number: string,
  time: string,
}

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
  popUpService = inject(PopUp);
  contactService = inject(ContactService);
  apartamentsService = inject(ApartamentsService);
  apartament = signal<ApartamentsModel | undefined>(undefined);
  isShowed = signal<boolean>(false);
  dataSubscription: Subscription | undefined;
  submitted1 = signal<boolean>(false);
  submitted2 = signal<boolean>(false);
  ngOnInit(): void {
    const id = signal(this.route.snapshot.params['id']);
    if(!id){
      return;
    }
    this.dataSubscription = this.apartamentsService.getApartamentById(id()).subscribe({
      next: (data) => {
        this.apartament.set(data);
      },
      error: () => {
        this.popUpService.showError('Cannot load data apartament site. Sorry, please try again later.', 'DataBase Error');
      },
      complete: () => {},
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted1.set(true);
    if(this.signalRegisterForm().invalid()){
      this.popUpService.showWarning('Contact form contains errors. Please correct them.','Form Validation Error');
      return
    }
    this.contactService.contactAboutApartament(this.signalRegisterModel()).subscribe({
      next: () => {
        this.popUpService.showSuccess(`Apartament contact message.`,`Contact message about apartament ${this.apartament()?.details?.advertisement?.idAdvertisement} was sent succesfully. `);
        this.onResetForm();
      },
      error: () => {
        this.popUpService.showError('Failed to connect to Database. We are already fixing it. Sorry!','Database Error');
      },
      complete: () => {},
    }
    )
    
    
  }
  onContactCall(event: Event): void{
    event.preventDefault();
    this.submitted2.set(true);
    if(this.signalContactForm().invalid()){ //change it from form to one input value (just validate number phone, dont need to check time );
      this.popUpService.showWarning('Invalid phone number. Please, type correct number.','Number Validation Error');
      return
    }
    this.signalContact.update(f => ({
        ...f,
        time: this.onGetTime(),
      }));
    this.contactService.needToCall(this.signalContact()).subscribe({
      next: () => {
        this.popUpService.showSuccess('Phone Number Contact', 'Contact Message was sent succesfully. ');
        this.onResetForm();
      },
      error: () => {
        this.popUpService.showError('Failed to connect to Database. We are already fixing it. Sorry!','Database Error');
      },
      complete: () => {},
    })
    // not working, check and repair it!
  }

  signalContact = signal<contact>({
    number: '',
    time: '',
  })

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
    pattern(fieldPath.phoneNumber, /^\d{3}-\d{3}-\d{3}$/, {message: 'Phone Number must be in format: 123-456-789'});
    required(fieldPath.phoneNumber, {message: 'Phone Number is required'});
    email(fieldPath.email, {message: 'Enter a valid email'});
    required(fieldPath.email, {message: 'Email is required'});
  });
  
  signalContactForm = form(this.signalContact, (fieldPath) => {
    required(fieldPath.number, {message: 'Phone number is required'});
    pattern(fieldPath.number, /^\d{3}-\d{3}-\d{3}$/, {message: 'Phone Number must be in format: 123-456-789'});

  })


  onCallBack() {
    this.isShowed.update((show) => !show);
  }

  onGetTime(): string{
    let currentDate = new Date()
    let result = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}  ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    return result;
  }

  onResetForm() {
    this.signalRegisterModel.set({message: '', name: '', email: '', phoneNumber: '', loan: false, news: false});
    this.signalRegisterForm().reset();
  }
}
