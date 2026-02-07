import { Component, inject, signal } from '@angular/core';
import { ContactService } from '../services/contact-service';
import { email, form, pattern, required, FormField } from '@angular/forms/signals';

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
    this.contactService.createMessage(this.signalformModel()).subscribe(
      response => console.log('Message sent successfully.', response),
      // error => console.log('Error: ', error),
    );
    this.signalformModel.set({ name: '', email: '', number: '', subject: '', message: '', check: false,})
    this.contactForm().reset();
  }
}
