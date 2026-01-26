import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../services/contact-service';
import { email, form, pattern, required, Field } from '@angular/forms/signals';

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
  imports: [ReactiveFormsModule, Field],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  public contactService = inject(ContactService);
  // changed this form (reactiveForm => signalForm)
  
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
    required(fieldPath.number, {message: 'Message is required.'});
    pattern(fieldPath.number, /^\d{3}-\d{3}-\d{3}$/, {message: 'Phone number must be in format 123-123-123'})
    required(fieldPath.subject, {message: 'Message is required.'});
    required(fieldPath.message, {message: 'Message is required.'});
    required(fieldPath.check, {message: 'You need to accept regulations.'});
  })
  /*
  contactForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    number: new FormControl<number | null>(null, [Validators.required]),
    subject: new FormControl<string>('', [Validators.required]),
    message: new FormControl<string>('', [Validators.required]),
    check: new FormControl<boolean>(false, Validators.requiredTrue),
  })
    */
  onSubmit(event: Event) {
    this.contactService.createMessage(this.contactForm).subscribe(
      response => console.log('Message sent successfully.', response),
      error => console.log('Error', error),
    )
    // console.log(this.contactForm.value);
  }
}
