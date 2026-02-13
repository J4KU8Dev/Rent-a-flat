import { Component, inject, signal } from '@angular/core';
import { ContactService } from '../services/contact-service';
import { email, form, pattern, required, FormField } from '@angular/forms/signals';
import { PopUp } from '../pop-up/pop-up';

interface formData {
  name: string,
  email: string,
  number: string,
  subject: string,
  message: string,
  check: boolean,
}

@Component({
  selector: 'app-contact',
  imports: [FormField],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  public contactService = inject(ContactService);
  popUpService = inject(PopUp);
  public nameComponent: string = 'Contact request'
  submitted = signal<boolean>(false);
  signalformModel = signal<formData>({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: '',
    check: false,
  })
  contactForm = form(this.signalformModel, (fieldPath) => {
    required(fieldPath.name, {message: 'Name is required.'});
    required(fieldPath.email, {message: 'Email is required.'});
    email(fieldPath.email, {message: 'Enter a valid email.'});
    required(fieldPath.number, {message: 'Phone number is required.'});
    pattern(fieldPath.number, /^\d{3}-\d{3}-\d{3}$/, {message: 'Phone number must be in format 123-123-123'})
    required(fieldPath.subject, {message: 'Subject is required.'});
    required(fieldPath.message, {message: 'Message is required.'});
    required(fieldPath.check, {message: 'You need to accept regulations.'});
  })
  
  onSubmit(event: Event) {
    event.preventDefault();
    this.submitted.set(true);
    if(this.contactForm().invalid()){
      // console.log('Form validation error')
      this.popUpService.showWarning('Contact form contains errors. Please correct them.','Form Validation Error');
      return
    }
    this.contactService.createMessage(this.signalformModel()).subscribe({
      next: () => {
        this.popUpService.showSuccess(this.nameComponent, 'Contact Message was sent succesfully. ');
        this.onResetForm();
      },
      error: () => {
        this.popUpService.showError('Failed to connect to Database. We are already fixing it. Sorry!','Database Error');
      },
      complete: () => {},
    });
    
  }

  onResetForm() {
    this.signalformModel.set({ name: '', email: '', number: '', subject: '', message: '', check: false,})
    this.contactForm().reset();
  }
}
